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

## Decisiones técnicas

- **json-server como backend simulado**: Se optó por json-server para simular una API REST completa sin necesidad de una base de datos real, lo que agiliza el desarrollo en entorno escolar.
- **JWT para autenticación**: Se implementó autenticación con tokens JWT para proteger los endpoints y gestionar roles de usuario.
- **Contexto de autenticación**: Se centralizó toda la lógica de autenticación en un `AuthProvider` con un hook `useAuth` para que cualquier componente pueda acceder al estado de sesión sin prop drilling.
- **Componentes reutilizables**: Se extrajeron componentes como `SearchBar`, `Filter`, `ExerciseCard` y `WorkoutCard` para evitar repetición de código.
- **Ordenación sin componente separado**: Se decidió no extraer la lógica de ordenación a un componente independiente porque cada página filtra por campos distintos (muscleGroup, level, role) con criterios de ordenación diferentes. Extraerlo a un componente genérico hubiera requerido demasiadas props y reducido la legibilidad. Los componentes `SearchBar` y `Filter` ya cubren la parte visual reutilizable, mientras que la lógica específica de cada página permanece donde tiene contexto.
- **Separación de servicios**: Toda la lógica de comunicación con la API está separada en archivos de servicio (`authService`, `exerciseService`, `workoutService`, etc.) para mantener los componentes limpios.
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