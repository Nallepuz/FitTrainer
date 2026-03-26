const fs = require("fs");                                     // Sirve para leer y esscribir archivos
const bodyParser = require("body-parser");                    // Leer peticiones HTTP
const jsonServer = require('json-server')                     // Crea una API REST a partir de un Json (db.json)
const jwt = require("jsonwebtoken");                          // Crear y verificar token


// Se crea el server y se indica la ruta (db.json)
const server = jsonServer.create();
const router = jsonServer.router("./db.json");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());                                // Interpretar peticiones formato Json
server.use(jsonServer.defaults());

// Se define la palabra secreta y el tiempo de expiración
const SECRET_KEY = "miPalabraSecreta123456789";
const expiresIn = "1h";

// Crea un JWT
function createToken(datosUser) {
  return jwt.sign(datosUser, SECRET_KEY, { expiresIn });
}

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

  const lastItemId = users.length ? users[users.length - 1].id : 0;   // Búsqueda del último usuario del array y obtener su id

  const newUser = {
    id: lastItemId + 1,
    name,
    email,
    password,
    role: "user"
  };

  users.push(newUser);      // Lo añade al final del array
  saveUsers(users);         // Lo guarda en el db.Json


  const access_token = createToken({    // Crea el token al registrarse redireccionando
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