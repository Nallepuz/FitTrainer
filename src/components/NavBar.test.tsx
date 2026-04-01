import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAuth } from "../context/authContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import NavBar from "./NavBar";
import { Buttons } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js";

vi.mock("../context/authContext", () => ({
    useAuth: vi.fn(() => ({
        user: null,
        token: null,
        loadingSession: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
    }))
}));

describe("NavBar", () => {
    it("Comprobar si en el navegador solo se muestran las páginas visibles sin token", () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument;
        expect(screen.getByText("Ejercicios")).toBeInTheDocument;
        expect(screen.getByText("Login")).toBeInTheDocument;
        expect(screen.getByText("Registrar")).toBeInTheDocument;
    });

    it("Comprobar si en el navegador muestran todas las páginas visibles con token de USER", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: { id: 1, name: "Pepe", email: "Pepe@fittrainer.com", role: "user" },
            token: "fake-token",
            loadingSession: false,
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        })
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument;
        expect(screen.getByText("Ejercicios")).toBeInTheDocument;
        expect(screen.getByText("Entrenamientos")).toBeInTheDocument;
        expect(screen.getByText("Me")).toBeInTheDocument;
        expect(screen.getByText("Dashboard")).toBeInTheDocument;
        expect(screen.getByText("Logout")).toBeInTheDocument;

        expect(screen.queryByText("Login")).not.toBeInTheDocument();
        expect(screen.queryByText("Registrar")).not.toBeInTheDocument();
    });

    it("Comprobar si en el navegador muestran todas las páginas visibles con token de ADMIN", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: { id: 1, name: "Pepe", email: "Pepe@fittrainer.com", role: "admin" },
            token: "fake-token",
            loadingSession: false,
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
        })
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument;
        expect(screen.getByText("Ejercicios")).toBeInTheDocument;
        expect(screen.getByText("Entrenamientos")).toBeInTheDocument;
        expect(screen.getByText("Me")).toBeInTheDocument;
        expect(screen.getByText("Crear Ejercicios")).toBeInTheDocument;
        expect(screen.getByText("Dashboard")).toBeInTheDocument;
        expect(screen.getByText("Logout")).toBeInTheDocument;

        expect(screen.queryByText("Login")).not.toBeInTheDocument();
        expect(screen.queryByText("Registrar")).not.toBeInTheDocument();
    });

    it("Comprobar si en el navegador al pulsar el botón Logout nos cierra la sesión actual", async () => {
        const logoutMock = vi.fn();

        vi.mocked(useAuth).mockReturnValue({
            user: { id: 1, name: "Pepe", email: "Pepe@fittrainer.com", role: "admin" },
            token: "fake-token",
            loadingSession: false,
            login: vi.fn(),
            register: vi.fn(),
            logout: logoutMock,
        })
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
        const logout = screen.getByRole("button", { name: /logout/i });
        await userEvent.click(logout);

        expect(logoutMock).toHaveBeenCalled();
    });
});