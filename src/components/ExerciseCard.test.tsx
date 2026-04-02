import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExerciseCard from "./ExerciseCard";
import userEvent from "@testing-library/user-event";

describe("ExerciseCard", () => {
    it("Comprobar si muestra la tarjeta de ejercicios", () => {
        render(<ExerciseCard
            exercise={{ id: 1, name: "Press Banca", image: "imagen.jpg", muscleGroup: "pecho", description: "ejercicio de empuje" }}
        />);

        expect(screen.getByAltText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("pecho")).toBeInTheDocument();
        expect(screen.getByText("ejercicio de empuje")).toBeInTheDocument();
    });

    it("Comprobar que muestra el botón de añadir en la tarjeta", () => {
        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showAddButton={true}
        />);

        expect(screen.getByAltText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("pecho")).toBeInTheDocument();
        expect(screen.getByText("ejercicio de empuje")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /añadir/i })).toBeInTheDocument();
    });

    it("Comprobar que no muestra el botón de añadir en la tarjeta", () => {
        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showAddButton={false}
        />);

        expect(screen.getByAltText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("pecho")).toBeInTheDocument();
        expect(screen.getByText("ejercicio de empuje")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /añadir/i })).not.toBeInTheDocument();
    });

    it("Comprobar que muestra el botón de borrar en la tarjeta", () => {
        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showDeleteButton={true}
        />);

        expect(screen.getByAltText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("pecho")).toBeInTheDocument();
        expect(screen.getByText("ejercicio de empuje")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Borrar/i })).toBeInTheDocument();
    });

    it("Comprobar que no muestra el botón de borrar en la tarjeta", () => {
        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showDeleteButton={false}
        />);

        expect(screen.getByAltText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("Press Banca")).toBeInTheDocument();
        expect(screen.getByText("pecho")).toBeInTheDocument();
        expect(screen.getByText("ejercicio de empuje")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /Borrar/i })).not.toBeInTheDocument();
    });

    it("Comprobar que al hacer click en añadir llama a onAdd", async () => {
        const onAdd = vi.fn();

        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showAddButton={true} onAdd={onAdd}
        />);

        await userEvent.click(screen.getByRole("button", { name: /añadir/i }));
        expect(onAdd).toHaveBeenCalledWith({
            id: 1,
            name: "Press Banca",
            image: "imagen.jpg",
            muscleGroup: "pecho",
            description: "ejercicio de empuje"
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it("Comprobar que al hacer click en añadir llama a onDelete", async () => {
        const onDelete = vi.fn();

        render(<ExerciseCard
            exercise={{
                id: 1,
                name: "Press Banca",
                image: "imagen.jpg",
                muscleGroup: "pecho",
                description: "ejercicio de empuje"
            }} showDeleteButton={true} onDelete={onDelete}
        />);

        await userEvent.click(screen.getByRole("button", { name: /borrar/i }));
        expect(onDelete).toHaveBeenCalledTimes(1);
    })
})