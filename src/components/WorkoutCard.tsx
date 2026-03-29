import type { Workout } from "../types/workout";
import { Link } from "react-router-dom";

type Props = {
    workout: Workout;
};

export default function WorkoutCard({ workout }: Props) {
    return (
        <div style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)"}}>
            <h2 style={{
                margin: "0 0 10px 0",
                fontSize: "1.3rem",
                color: "#ffffff"}}>
                {workout.title}
            </h2>

            <p style={{
                margin: "6px 0",
                color: "#d1d1d1"}}>
                {workout.description}
            </p>

            <p style={{
                margin: "6px 0",
                color: "#d1d1d1",
                lineHeight: "1.4"}}>
                {workout.duration}
            </p>

            <p
                style={{
                    margin: "6px 0",
                    color: "#d1d1d1",
                    lineHeight: "1.4"}}>
                {workout.level}
            </p>
            <Link to="/workoutsExercises" className="button">
                    Editar
            </Link>
        </div>
    );
}