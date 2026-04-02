import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAllWorkouts, getWorkoutById, createWorkout, deleteWorkout } from "./workoutService";

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
    vi.resetAllMocks();
});

describe("exerciseService", () => {
    it("Comprobar si visualiza todos los entrenamientos", async () => {
        localStorage.setItem("auth_token", "fake-token");
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ([{ id: 1, 
                title: "Entrenamiento Lunes", 
                description: "Tirón y Empuje", 
                duration: 45, 
                level: "Principiante", 
                userId: 1}]),
        } as Response);

        const workout = await getAllWorkouts();
        expect(workout).toEqual([{ 
            id: 1, 
            title: "Entrenamiento Lunes", 
            description: "Tirón y Empuje", 
            duration: 45, 
            level: "Principiante", 
            userId: 1}])
    });

    it("Comprobar si  falla al tratar de visualizar todos los ejercicios", async () => {
        localStorage.setItem("auth_token", "fake-token");
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(getAllWorkouts()).rejects.toThrow("No se pudieron cargar los entrenamientos")
    });

    it("Comprobar si visualiza un entrenamiento específico", async () => {
        localStorage.setItem("auth_token", "fake-token");
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, 
                title: "Entrenamiento Lunes", 
                description: "Tirón y Empuje", 
                duration: 45, 
                level: "Principiante", 
                userId: 1}),
        } as Response);

        await expect(getWorkoutById(1)).resolves.toEqual({ 
            id: 1, 
            title: "Entrenamiento Lunes", 
            description: "Tirón y Empuje", 
            duration: 45, 
            level: "Principiante", 
            userId: 1});
    });

    it("Comprobar si falla al intentar visualizar un entrenamiento específico", async () => {
        localStorage.setItem("auth_token", "fake-token");
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            json: async () => ([{ id: 1, 
                title: "Entrenamiento Lunes", 
                description: "Tirón y Empuje", 
                duration: 45, 
                level: "Principiante", 
                userId: 1}]),
        } as Response);

        await expect(getWorkoutById(999)).rejects.toThrow("No se pudo cargar el entrenamiento");
    });

    it("Comprobar si crea el entrenamiento", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
        } as Response);

        await expect(createWorkout({  
            title: "Entrenamiento Lunes", 
            description: "Tirón y Empuje", 
            duration: 45, 
            level: "Principiante", 
           })).resolves.not.toThrow();
    });

    it("Comprobar si falla al intentar crear el entrenamiento", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(createWorkout({  
            title: "Entrenamiento Lunes", 
            description: "Tirón y Empuje", 
            duration: 45, 
            level: "Principiante", 
           })).rejects.toThrow("No se ha podido crear el entrenamiento");
    });

    it("Comprobar si elimina el entrenamiento", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
        } as Response);

        await expect(deleteWorkout(1)).resolves.not.toThrow();
    });

    it("Comprobar si falla al intentar eliminar el entrenamiento", async () => {
        localStorage.setItem("auth_token", "fake-token");

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
        } as Response);

        await expect(deleteWorkout(999)).rejects.toThrow("No se pudo borrar el entrenamiento");
    });
})