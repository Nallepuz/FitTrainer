import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MePage from "./pages/MePage";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";
import ExercisesPage from "./pages/ExercisesPage";
import Workout from "./pages/Workout";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutExercise from "./pages/WorkoutExercise";
import CreateExercise from "./pages/CreateExercise";
import Dashboard from "./pages/Dashboard";



export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div className='Layout'>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/exercises" element={<ExercisesPage />} />

              <Route path="/me" element={<RequireAuth> <MePage /> </RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
              <Route path="/createExercise" element={<RequireAuth><RequireRole allowedRoles={["admin", "trainer"]}><CreateExercise /></RequireRole></RequireAuth>} />
              <Route path="/workouts" element={<RequireAuth> <Workout /> </RequireAuth>} />
              <Route path="/workoutsExercises/:id" element={<RequireAuth><WorkoutExercise /></RequireAuth>} />
              <Route path="/workouts/new" element={<RequireAuth><CreateWorkout /></RequireAuth>} />

            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}