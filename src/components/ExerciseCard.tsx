import type { Exercise } from "../types/exercise";

type Props = {
    exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
    return (
        <div
            style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            }}
        >
            <h2
                style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.3rem",
                    color: "#ffffff",
                }}
            >
                {exercise.name}
            </h2>

            <p
                style={{
                    margin: "6px 0",
                    color: "#d1d1d1",
                }}
            >
                {exercise.muscleGroup}
            </p>

            <p
                style={{
                    margin: "6px 0",
                    color: "#d1d1d1",
                    lineHeight: "1.4",
                }}
            >
                {exercise.description}
            </p>
        </div>
    );
}