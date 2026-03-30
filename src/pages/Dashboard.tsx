import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import type { User } from "../types/user";
import type { Exercise } from "../types/exercise";
import type { Workout } from "../types/workout";
import { getAllUsers } from "../service/userService";
import { getAllExercises } from "../service/exerciseService";
import { getAllWorkouts } from "../service/workoutService";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import AdminDashboard from "../components/AdminDashboard";
import TrainerDashboard from "../components/TrainerDashboard";
import UserDashboard from "../components/UserDashboard";
import AdminSummary from "../components/AdminSummary";
import TrainerSummary from "../components/TrainerSummary";
import UserSummary from "../components/UserSummary";

export default function Dashboard() {
    const { user, loadingSession } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [levelFilter, setLevelFilter] = useState("all");
    const [order, setOrder] = useState("az");

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const userRole = user.role;

        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                if (userRole === "admin") {
                    const [usersData, workoutsData, exercisesData] = await Promise.all([
                        getAllUsers(),
                        getAllWorkouts(),
                        getAllExercises(),
                    ]);

                    setUsers(usersData);
                    setWorkouts(workoutsData);
                    setExercises(exercisesData);
                    return;
                }

                const [workoutsData, exercisesData] = await Promise.all([
                    getAllWorkouts(),
                    getAllExercises(),
                ]);

                setWorkouts(workoutsData);
                setExercises(exercisesData);
            } catch {
                setError("No se pudo cargar el dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [user]);

    if (loadingSession) {
        return <p>Cargando dashboard...</p>;
    }

    if (loading) {
        return <p>Cargando dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>No autorizado</p>;
    }

    const totalUsers = users.length;
    const totalWorkouts = workouts.length;
    const totalExercises = exercises.length;
    const totalTrainers = users.filter((item) => item.role === "trainer").length;
    const ownWorkouts = workouts.filter((workout) => workout.userId === user.id);

    const userTotalWorkouts = ownWorkouts.length;
    const userBeginnerWorkouts = ownWorkouts.filter(
        (workout) => workout.level === "Principiante"
    ).length;
    const userIntermediateWorkouts = ownWorkouts.filter(
        (workout) => workout.level === "Intermedio"
    ).length;
    const userExpertWorkouts = ownWorkouts.filter(
        (workout) => workout.level === "Experto"
    ).length;

    const trainerTotalWorkouts = workouts.length;
    const trainerBeginnerWorkouts = workouts.filter(
        (workout) => workout.level === "Principiante"
    ).length;
    const trainerIntermediateWorkouts = workouts.filter(
        (workout) => workout.level === "Intermedio"
      ).length;
    const trainerExpertWorkouts = workouts.filter(
        (workout) => workout.level === "Experto"
    ).length;

    const roleOptions = [
        { value: "all", label: "Todos" },
        { value: "admin", label: "Admin" },
        { value: "trainer", label: "Trainer" },
        { value: "user", label: "User" },
    ];

    const levelOptions = [
        { value: "all", label: "Todos" },
        { value: "Principiante", label: "Principiante" },
        { value: "Intermedio", label: "Intermedio" },
        { value: "Experto", label: "Experto" },
    ];

    const adminOrderOptions = [
        { value: "az", label: "Nombre A-Z" },
        { value: "za", label: "Nombre Z-A" },
        { value: "workoutsAsc", label: "Workouts menor-mayor" },
        { value: "workoutsDesc", label: "Workouts mayor-menor" },
    ];

    const workoutOrderOptions = [
        { value: "az", label: "Título A-Z" },
        { value: "za", label: "Título Z-A" },
        { value: "durationAsc", label: "Duración menor-mayor" },
        { value: "durationDesc", label: "Duración mayor-menor" },
    ];

    function countUserWorkouts(userId: number) {
        return workouts.filter((workout) => workout.userId === userId).length;
    }

    const searchedAdminUsers = users.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    const filteredAdminUsers = searchedAdminUsers.filter((item) => {
        if (roleFilter === "all") {
            return true;
        }
        return item.role === roleFilter;
    });

    const sortedAdminUsers = [...filteredAdminUsers].sort((a, b) => {
        if (order === "az") {
            return a.name.localeCompare(b.name);
        }
        if (order === "za") {
            return b.name.localeCompare(a.name);
        }
        if (order === "workoutsAsc") {
            return countUserWorkouts(a.id) - countUserWorkouts(b.id);
        }
        if (order === "workoutsDesc") {
            return countUserWorkouts(b.id) - countUserWorkouts(a.id);
        }
        return 0;
    });

    const searchedTrainerWorkouts = workouts.filter((workout) =>
        workout.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredTrainerWorkouts = searchedTrainerWorkouts.filter((workout) => {
        if (levelFilter === "all") {
            return true;
        }
        return workout.level === levelFilter;
    });

    const sortedTrainerWorkouts = [...filteredTrainerWorkouts].sort((a, b) => {
        if (order === "az") {
            return a.title.localeCompare(b.title);
        }
        if (order === "za") {
            return b.title.localeCompare(a.title);
        }
        if (order === "durationAsc") {
            return Number(a.duration) - Number(b.duration);
        }
        if (order === "durationDesc") {
            return Number(b.duration) - Number(a.duration);
        }

        return 0;
    });

    const searchedUserWorkouts = ownWorkouts.filter((workout) =>
        workout.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredUserWorkouts = searchedUserWorkouts.filter((workout) => {
        if (levelFilter === "all") {
            return true;
        }
        return workout.level === levelFilter;
    });

    const sortedUserWorkouts = [...filteredUserWorkouts].sort((a, b) => {
        if (order === "az") {
            return a.title.localeCompare(b.title);
        }

        if (order === "za") {
            return b.title.localeCompare(a.title);
        }

        if (order === "durationAsc") {
            return Number(a.duration) - Number(b.duration);
        }

        if (order === "durationDesc") {
            return Number(b.duration) - Number(a.duration);
        }

        return 0;
    });

    if (user.role === "admin") {
        return (
            <>
                <h1>Dashboard Admin</h1>

                <AdminSummary
                    totalUsers={totalUsers}
                    totalTrainers={totalTrainers}
                    totalWorkouts={totalWorkouts}
                    totalExercises={totalExercises}
                />

                <div className="filters">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filter value={roleFilter} setValue={setRoleFilter} options={roleOptions} />
                    <Filter value={order} setValue={setOrder} options={adminOrderOptions} />
                </div>

                <AdminDashboard
                    users={sortedAdminUsers}
                    countUserWorkouts={countUserWorkouts}
                />
            </>
        );
    }

    if (user.role === "trainer") {
        return (
            <>
                <h1>Dashboard Trainer</h1>

                <TrainerSummary
                    totalWorkouts={trainerTotalWorkouts}
                    totalExercises={totalExercises}
                    beginnerWorkouts={trainerBeginnerWorkouts}
                    intermediateWorkouts={trainerIntermediateWorkouts}
                    expertWorkouts={trainerExpertWorkouts}
                />

                <div className="filters">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filter value={levelFilter} setValue={setLevelFilter} options={levelOptions} />
                    <Filter value={order} setValue={setOrder} options={workoutOrderOptions} />
                </div>

                <TrainerDashboard workouts={sortedTrainerWorkouts} />
            </>
        );
    }

    return (
        <>
            <h1>Dashboard User</h1>

            <UserSummary
                totalWorkouts={userTotalWorkouts}
                beginnerWorkouts={userBeginnerWorkouts}
                intermediateWorkouts={userIntermediateWorkouts}
                expertWorkouts={userExpertWorkouts}
            />

            <div className="filters">
                <SearchBar search={search} setSearch={setSearch} />
                <Filter value={levelFilter} setValue={setLevelFilter} options={levelOptions} />
                <Filter value={order} setValue={setOrder} options={workoutOrderOptions} />
            </div>

            <UserDashboard workouts={sortedUserWorkouts} />
        </>
    );
}