const fs = require("fs");                                     // Sirve para leer y esscribir archivos
const path = require("path");
const jsonServer = require('json-server')                     // Crea una API REST a partir de un Json (db.json)
const jwt = require("jsonwebtoken");                          // Crear y verificar token

const dbPath = path.join(__dirname, "db.json");

// Se crea el server y se indica la ruta (db.json)
const server = jsonServer.create();
const router = jsonServer.router(dbPath);

server.use(jsonServer.bodyParser);
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
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  return db.users || [];
}

function saveUsers(updatedUsers) {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  db.users = updatedUsers;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function findUser(email, password) {
  return getUsers().find(
    (user) => user.email === email && user.password === password
  );
}

// WORKOUTS
function getWorkouts() {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  return db.workouts || [];
}

function saveWorkouts(updatedWorkouts) {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  db.workouts = updatedWorkouts;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// CREACIÓN WORKOUTS
server.post("/workouts", (req, res) => {
  const { title, description, duration, level } = req.body;
  const workouts = router.db.get("workouts").value();


  const existingWorkout = workouts.find((workout) => workout.title === title);

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  const lastItemId = workouts.length ? workouts[workouts.length - 1].id : 0;   // Búsqueda del último usuario del array y obtener su id

  const newWorkout = {
    id: lastItemId + 1,
    title,
    description,
    duration,
    level,
    userId
  };

  router.db.get("workouts").push(newWorkout).write();

  return res.status(201).json({ message: "Workout creado correctamente" });

});

// CREACIÓN WorkoutExercises
server.post("/workoutExercises", (req, res) => {
  const {workoutId, exerciseId} = req.body;
  const workoutExercise = router.db.get("workoutExercises").value();
  const sets = 3;
  const reps = 10;
  const weight = 0;

  const existingWorkoutExercise= workoutExercise.find((workoutExercise) => workoutExercise.exerciseId === exerciseId && workoutExercise.workoutId === workoutId);
  if (existingWorkoutExercise) {
    return res.status(409).json({ message: "El ejercicio ya existe en el plan de entrenamiento" });
  }

  const lastItemId = workoutExercise.length ? workoutExercise[workoutExercise.length - 1].id : 0;   // Búsqueda del último usuario del array y obtener su id

  const newWorkoutExercise = {
    id: lastItemId + 1,
    workoutId,
    exerciseId,
    sets,
    reps,
    weight
  };

  router.db.get("workoutExercises").push(newWorkoutExercise).write();

  return res.status(201).json({ message: "WorkoutExercises creado correctamente" });
})

// AUTENTICACIÓN DEL USUARIO

server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "El email ya existe" });
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