const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require('json-server')
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "miPalabraSecreta123456789";
const expiresIn = "1h";

// JWT

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// ENDPOINTS BASE DE DATOS -------------------------------------

// USERS

function getUsers() {
  const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  return db.users || [];
}

function saveUsers(updatedUsers) {
  const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  db.users = updatedUsers;
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
}

function findUser(email, password) {
  return getUsers().find(
    (user) => user.email === email && user.password === password
  );
}

// AUTENTICACIÓN DEL USUARIO

server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(401).json({ message: "El email ya existe" });
  }

  const lastItemId = users.length ? users[users.length - 1].id : 0;

  const newUser = {
    id: lastItemId + 1,
    name,
    email,
    password,
    role: "user"
  };

  users.push(newUser);
  saveUsers(users);

  const access_token = createToken({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  });

  return res.status(200).json({ access_token });
});

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Email o contraseña incorrectos" });
  }

  const access_token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  return res.status(200).json({ access_token });
});

server.get("/me", (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    return res.status(401).json({ message: "Error en la autorización" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    });
  } catch (err) {
    return res.status(401).json({ message: "El token ha expirado o es inválido" });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Servidor JSON arrancado en http://localhost:8000");
});