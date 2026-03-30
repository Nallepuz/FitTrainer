import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MePage from "./pages/MePage";
import AdminPage from "./pages/AdminPage";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";
import ExercisesPage from "./pages/ExercisesPage";
import Workout from "./pages/Workout";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutExercise from "./pages/WorkoutExercise";
import CreateExercise from "./pages/CreateExercise";



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
              <Route path="/createExercise" element={<CreateExercise />} />
              <Route path="/workouts" element={<Workout />} />
              <Route path="/workoutsExercises/:id" element={<WorkoutExercise />} />
              <Route path="/workouts/new" element={<CreateWorkout />} />

              <Route path="/me" element={<RequireAuth> <MePage /> </RequireAuth>} />
              <Route path="/admin" element={<RequireAuth> <RequireRole allowedRoles={["admin"]}><AdminPage />
              </RequireRole>
              </RequireAuth>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}