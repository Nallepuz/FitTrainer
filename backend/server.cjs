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

// JWT ---------------------------------------------------------------------------------------------------------
function createToken(datosUser) {
  return jwt.sign(datosUser, SECRET_KEY, { expiresIn });
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Token no proporcionado o formato inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "El token ha expirado o es inválido" });
  }
}
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }

    next();
  };
}
// -------------------------------------------------------------------------------------------------------------



// USERS -------------------------------------------------------------------------------------------------------
function getUsers() {
  return router.db.get("users").value() || [];
}

function saveUsers(updatedUsers) {
  router.db.set("users", updatedUsers).write();
}

function findUser(email, password) {
  return router.db
    .get("users")
    .find({ email, password })
    .value();
}

server.get("/users", authenticateToken, requireRole("admin"), (req, res) => {
  const users = getUsers();
  return res.status(200).json(users);
});
// -------------------------------------------------------------------------------------------------------------



// WORKOUTS ----------------------------------------------------------------------------------------------------
function getWorkouts() {
  return router.db.get("workouts").value() || [];
}

server.get("/workouts", authenticateToken, requireRole("admin", "trainer", "user"), (req, res) => {
  const workouts = getWorkouts();
  return res.status(200).json(workouts);
});

server.post("/workouts", authenticateToken, (req, res) => {
  const { title, description, duration, level } = req.body;
  const workouts = router.db.get("workouts").value();

  const userId = req.user.id;

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

server.delete("/workouts/:id", authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const workouts = router.db.get("workouts").value();

  const existingWorkout = workouts.find((workout) => workout.id === id);

  if (!existingWorkout) {
    return res.status(404).json({ message: "El entrenamiento no existe" });
  }

  const isAdmin = req.user.role === "admin";
  const isTrainer = req.user.role === "trainer";
  const isOwner = req.user.role === "user" && existingWorkout.userId === req.user.id;

  if (!isAdmin && !isTrainer && !isOwner) {
    return res.status(403).json({ message: "No tienes permisos para borrar este entrenamiento" });
  }

  const updatedWorkout = workouts.filter((workout) => workout.id !== id);
  const workoutExercises = router.db.get("workoutExercises").value();
  const updatedWorkoutExercises = workoutExercises.filter(
    (item) => item.workoutId !== id
  );

  router.db.assign({
    workouts: updatedWorkout,
    workoutExercises: updatedWorkoutExercises,
  }).write();

  return res.status(200).json({ message: "Entrenamiento borrado correctamente" });
});
// -------------------------------------------------------------------------------------------------------------



// WORKOUTEXERCISES --------------------------------------------------------------------------------------------
server.post("/workoutExercises", authenticateToken, (req, res) => {
  const { workoutId, exerciseId } = req.body;
  const workoutExercise = router.db.get("workoutExercises").value();
  const sets = 3;
  const reps = 10;
  const weight = 0;

  const existingWorkoutExercise = workoutExercise.find((workoutExercise) => workoutExercise.exerciseId === exerciseId && workoutExercise.workoutId === workoutId);
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

server.put("/workoutExercises/:id", authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const { sets, reps, weight } = req.body;

  const workoutExercise = router.db.get("workoutExercises").value();

  const existingWorkoutExercise = workoutExercise.find((workoutExercise) => workoutExercise.id === id);
  if (!existingWorkoutExercise) {
    return res.status(404).json({ message: "El ejercicio no existe" });
  }

  existingWorkoutExercise.id
  existingWorkoutExercise.workoutId
  existingWorkoutExercise.exerciseId
  existingWorkoutExercise.sets = sets;
  existingWorkoutExercise.reps = reps;
  existingWorkoutExercise.weight = weight

  router.db.write();

  return res.status(200).json({ message: "WorkoutExercises modificado correctamente" });
})

server.delete("/workoutExercises/:id", authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const workoutExercises = router.db.get("workoutExercises").value();

  const existingWorkoutExercise = workoutExercises.find((workoutExercise) => workoutExercise.id === id);
  if (!existingWorkoutExercise) {
    return res.status(404).json({ message: "El ejercicio del entrenamiento no existe" });
  }

  const updatedWorkoutExercise = workoutExercises.filter((workoutExercise) => workoutExercise.id !== id);
  router.db.assign({ workoutExercises: updatedWorkoutExercise }).write();
  return res.status(200).json({ message: "Ejercicio borrado del entrenamiento correctamente" });
});
// -------------------------------------------------------------------------------------------------------------



// EJERCICIOS --------------------------------------------------------------------------------------------------
function getExercises() {
  return router.db.get("exercises").value() || [];
}

server.get("/exercises", (req, res) => {
  const exercises = getExercises();
  return res.status(200).json(exercises);
});

server.post("/exercises", authenticateToken, requireRole("trainer", "admin"), (req, res) => {
  const { name, image, muscleGroup, description } = req.body;
  const exercise = router.db.get("exercises").value();

  const existingExercise = exercise.find((exercise) => exercise.name === name);
  if (existingExercise) {
    return res.status(409).json({ message: "El ejercicio ya existe" });
  }

  const lastItemId = exercise.length ? exercise[exercise.length - 1].id : 0;   // Búsqueda del último usuario del array y obtener su id

  const newExercise = {
    id: lastItemId + 1,
    image,
    name,
    muscleGroup,
    description,
  };

  router.db.get("exercises").push(newExercise).write();

  return res.status(201).json({ message: "Ejercicio creado correctamente" });

});

server.delete("/exercises/:id", authenticateToken, requireRole("trainer", "admin"), (req, res) => {
  const id = Number(req.params.id);
  const exercises = router.db.get("exercises").value();

  const existingExercise = exercises.find((exercise) => exercise.id === id);
  if (!existingExercise) {
    return res.status(404).json({ message: "El ejercicio no existe" });
  }

  const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
  router.db.assign({ exercises: updatedExercises }).write();
  return res.status(200).json({ message: "Ejercicio borrado correctamente" });
});
// -------------------------------------------------------------------------------------------------------------



// LOGIN -------------------------------------------------------------------------------------------------------
server.post("/auth/register", (req, res) => {
  const { image, name, email, password } = req.body;
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "El email ya existe" });
  }

  const lastItemId = users.length ? users[users.length - 1].id : 0;   // Búsqueda del último usuario del array y obtener su id

  const newUser = {
    id: lastItemId + 1,
    image,
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

  return res.status(201).json({ access_token });
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

server.get("/me", authenticateToken, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});
// -------------------------------------------------------------------------------------------------------------

server.use(router);

server.listen(8000, () => {
  console.log("Servidor JSON arrancado en http://localhost:8000");
});