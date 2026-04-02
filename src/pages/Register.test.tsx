import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

const mockNavigate = vi.fn();
const mockRegister = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = (await vi.importActual("react-router-dom")) as object;
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("../context/authContext", () => ({
    useAuth: () => ({
        register: mockRegister,
    }),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

describe("Register", () => {
    it("Muestra el formulario de registro", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it("Register correcto redirige a /me", async () => {
        mockRegister.mockResolvedValueOnce(undefined);

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("Nombre"), "Prueba");
        await userEvent.type(screen.getByPlaceholderText("Correo"), "prueba@prueba.com");
        await userEvent.type(screen.getByPlaceholderText("Contraseña"), "1234");
        await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(mockNavigate).toHaveBeenCalledWith("/me");
    });

    it("Register incorrecto muestra mensaje de error", async () => {
        mockRegister.mockRejectedValueOnce(new Error("Error"));

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("Nombre"), "Prueba");
        await userEvent.type(screen.getByPlaceholderText("Correo"), "prueba@prueba.com");
        await userEvent.type(screen.getByPlaceholderText("Contraseña"), "1234");
        await userEvent.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(screen.getByText("No se pudo registrar el usuario")).toBeInTheDocument();
    });
});