# FitTrainer

## Descripción

FitTrainer es una aplicación web para la gestión de entrenamientos y ejercicios físicos. Permite a los usuarios crear y gestionar sus rutinas de entrenamiento, mientras que entrenadores y administradores pueden supervisar y gestionar el contenido de la plataforma.

## Funcionalidades

- **Autenticación**: Registro e inicio de sesión con JWT. La sesión se restaura automáticamente al recargar la página.
- **Roles**: La aplicación cuenta con tres roles — `admin`, `trainer` y `user` — cada uno con permisos diferentes.
- **Ejercicios**: Listado público de ejercicios con búsqueda, filtrado por grupo muscular y ordenación. Los trainers y admins pueden crear y eliminar ejercicios.
- **Entrenamientos**: Los usuarios pueden crear, ver y eliminar sus propios entrenamientos. Trainers y admins tienen acceso a todos.
- **Ejercicios por entrenamiento**: Cada entrenamiento puede tener ejercicios asociados con sets, reps y peso configurables.
- **Dashboard**: Panel personalizado según el rol del usuario con estadísticas y filtros.
- **Tests automatizados**: Cobertura de tests unitarios con Vitest y Testing Library.

## Tecnologías

- **Frontend**: React 19, TypeScript, React Router, Vite
- **Backend**: Node.js, json-server, JWT
- **Testing**: Vitest, Testing Library

## Roles y permisos

| Acción                        | User | Trainer | Admin |
|-------------------------------|------|---------|-------|
| Ver ejercicios                | Sí   | Sí      | Sí    |
| Crear / eliminar ejercicios   | No   | Sí      | Sí    |
| Ver sus propios workouts      | Sí   | Sí      | Sí    |
| Ver todos los workouts        | No   | Sí      | Sí    |
| Crear workouts                | Sí   | Sí      | Sí    |
| Ver todos los usuarios        | No   | No      | Sí    |
| Acceder al dashboard          | Sí   | Sí      | Sí    |

## Estructura del proyecto

```
src/
├── auth/         # Protección de rutas por autenticación y rol (RequireAuth, RequireRole)
├── components/   # Componentes reutilizables (SearchBar, Filter, ExerciseCard, WorkoutCard...)
├── context/      # AuthContext con useReducer para gestión de estado global
├── pages/        # Vistas principales (Dashboard, ExercisesPage, Workout, Login, Register...)
├── service/      # Servicios de comunicación con la API (authService, exerciseService, workoutService...)
└── types/        # Tipos TypeScript compartidos (auth, exercise, workout, user...)
```

## Decisiones técnicas

- **json-server como backend simulado**: Se optó por json-server para simular una API REST completa sin necesidad de una base de datos real, lo que agiliza el desarrollo en entorno escolar.

- **JWT para autenticación**: Se implementó autenticación con tokens JWT para proteger los endpoints y gestionar roles de usuario.

- **Contexto de autenticación**: Se centralizó toda la lógica de autenticación en un `AuthProvider` con un hook `useAuth` para que cualquier componente pueda acceder al estado de sesión sin prop drilling.
- **useReducer en el contexto de autenticación**: Se utilizó `useReducer` en lugar de múltiples `useState` para gestionar el estado global de autenticación (`user`, `token`, `loadingSession`). Este patrón centraliza todas las transiciones de estado en un único reducer con acciones explícitas (`LOGIN`, `LOGOUT`, `RESTORE_SESSION`), lo que hace el código más predecible y fácil de mantener. Cada acción describe semánticamente qué ocurrió, en vez de tener múltiples llamadas a `setState` dispersas por el código.
- **Componentes reutilizables**: Se extrajeron componentes como `SearchBar`, `Filter`, `ExerciseCard` y `WorkoutCard` para evitar repetición de código.

- **Ordenación sin componente separado**: Se decidió no extraer la lógica de ordenación a un componente independiente porque cada página filtra por campos distintos (`muscleGroup`, `level`, `role`) con criterios de ordenación diferentes. Extraerlo a un componente genérico hubiera requerido demasiadas props y reducido la legibilidad. Los componentes `SearchBar` y `Filter` ya cubren la parte visual reutilizable, mientras que la lógica específica de cada página permanece donde tiene contexto.

- **Separación de servicios**: Toda la lógica de comunicación con la API está separada en archivos de servicio (`authService`, `exerciseService`, `workoutService`, etc.) para mantener los componentes limpios y sin llamadas directas a `fetch`.

- **Tests unitarios**: Se priorizó la relevancia de los tests sobre la cantidad, cubriendo las partes más críticas: autenticación, servicios y componentes clave.

## Instalación

### Backend
```bash
cd backend
npm install
node server.cjs
```

### Frontend
```bash
npm install
npm run dev
```

## Tests
```bash
npm run test:run
```
