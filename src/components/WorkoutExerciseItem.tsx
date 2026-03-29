import type { WorkoutExercise } from "../types/workoutExercise";

type Props = {
    workoutExercise: WorkoutExercise;
    exerciseName?: string;
}

export default function WorkoutExerciseItem({ workoutExercise, exerciseName }: Props) {
    return (<div style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)"
    }}>
        <h2 style={{
            margin: "0 0 10px 0",
            fontSize: "1.3rem",
            color: "#ffffff"
        }}>
            {exerciseName}
        </h2>

        <p style={{
            margin: "6px 0",
            color: "#d1d1d1"
        }}>
            Series: {workoutExercise.sets}
        </p>

        <p style={{
            margin: "6px 0",
            color: "#d1d1d1",
            lineHeight: "1.4"
        }}>
            Repeticiones: {workoutExercise.reps}
        </p>

        <p
            style={{
                margin: "6px 0",
                color: "#d1d1d1",
                lineHeight: "1.4"
            }}>
            Peso: {workoutExercise.weight}
        </p>
    </div>
    );
}