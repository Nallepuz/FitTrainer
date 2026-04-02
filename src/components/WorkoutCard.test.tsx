import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkoutCard from "./WorkoutCard";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("WorkoutCard", () => {
    it("Comprobar si muestra la tarjeta de entrenamiento", () => {
        render(
            <MemoryRouter>
                <WorkoutCard
                    workout={{
                        id: 1,
                        title: "Entrenamiento Lunes",
                        description: "Tirón y Empuje",
                        duration: 45,
                        level: "Principiante",
                        userId: 1
                    }} />
            </MemoryRouter>);

        expect(screen.getByText("Entrenamiento Lunes")).toBeInTheDocument();
        expect(screen.getByText("Tirón y Empuje")).toBeInTheDocument();
        expect(screen.getByText("45 min")).toBeInTheDocument();
        expect(screen.getByText("Principiante")).toBeInTheDocument();
    });

    it("Comprobar si al pulsar el botón Editar nos muestra el enlace", () => {
        render(
            <MemoryRouter>
                <WorkoutCard
                    workout={{
                        id: 1,
                        title: "Entrenamiento Lunes",
                        description: "Tirón y Empuje",
                        duration: 45,
                        level: "Principiante",
                        userId: 1
                    }} />
            </MemoryRouter>);

        expect(screen.getByRole("link", { name: /editar/i })).toHaveAttribute("href", "/workoutsExercises/1");
    });

    it("Comprobar que muestra el botón de borrar en la tarjeta", () => {
        render(
            <MemoryRouter>
                <WorkoutCard
                    workout={{
                        id: 1,
                        title: "Entrenamiento Lunes",
                        description: "Tirón y Empuje",
                        duration: 45,
                        level: "Principiante",
                        userId: 1
                    }} showDeleteButton={true} />
            </MemoryRouter>);

        expect(screen.getByText("Entrenamiento Lunes")).toBeInTheDocument();
        expect(screen.getByText("Tirón y Empuje")).toBeInTheDocument();
        expect(screen.getByText("45 min")).toBeInTheDocument();
        expect(screen.getByText("Principiante")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Borrar/i })).toBeInTheDocument();
    });

    it("Comprobar que no muestra el botón de borrar en la tarjeta", () => {
        render(
            <MemoryRouter>
                <WorkoutCard
                    workout={{
                        id: 1,
                        title: "Entrenamiento Lunes",
                        description: "Tirón y Empuje",
                        duration: 45,
                        level: "Principiante",
                        userId: 1
                    }} showDeleteButton={false} />
            </MemoryRouter>);

        expect(screen.getByText("Entrenamiento Lunes")).toBeInTheDocument();
        expect(screen.getByText("Tirón y Empuje")).toBeInTheDocument();
        expect(screen.getByText("45 min")).toBeInTheDocument();
        expect(screen.getByText("Principiante")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /Borrar/i })).not.toBeInTheDocument();
    });

    it("Comprobar que al hacer click en añadir llama a onDelete", async () => {
        const onDelete = vi.fn();

        render(
            <MemoryRouter>
                <WorkoutCard
                    workout={{
                        id: 1,
                        title: "Entrenamiento Lunes",
                        description: "Tirón y Empuje",
                        duration: 45,
                        level: "Principiante",
                        userId: 1
                    }} showDeleteButton={true} onDelete={onDelete} />
            </MemoryRouter>);

        await userEvent.click(screen.getByRole("button", { name: /borrar/i }));
        expect(onDelete).toHaveBeenCalledTimes(1);
    })
})