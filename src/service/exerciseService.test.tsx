import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllExercises, createExercise, deleteExercise } from "./exerciseService";

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
    vi.resetAllMocks();
});

describe("exerciseService", () => {
    it("Comprobar si visualiza todos los ejercicios", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ([{ id: 1, name: "Press Banca", image: "imagen.jpg", muscleGroup: "pecho", description: "ejercicio de empuje"}]),
        } as Response);

        const exercise = await getAllExercises();
        expect(exercise).toEqual([{ id: 1, name: "Press Banca", image: "imagen.jpg", muscleGroup: "pecho", description: "ejercicio de empuje"}])
    });

    it("Comprobar si  falla al tratar de visualizar todos los ejercicios", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(getAllExercises()).rejects.toThrow("No se pudieron cargar los ejercicios")
    });

    it("Comprobar si crea el ejercicio", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
        } as Response);

        await expect(createExercise({ name: "Press Banca", image: "imagen.jpg", muscleGroup: "pecho", description: "ejercicio de empuje"})).resolves.not.toThrow();
    });

    it("Comprobar si falla al intentar crear el ejercicio", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(createExercise({ name: "Press Banca", image: "imagen.jpg", muscleGroup: "pecho", description: "ejercicio de empuje"})).rejects.toThrow("No se ha podido crear el ejercicio");
    });

    it("Comprobar si elimina el ejercicio", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
        } as Response);

        await expect(deleteExercise(1)).resolves.not.toThrow();
    });

    it("Comprobar si falla al intentar eliminar el ejercicio", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(deleteExercise(999)).rejects.toThrow("No se pudo borrar el ejercicio");
    });
})