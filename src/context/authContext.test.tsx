import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "./authContext";
import { renderHook, act } from "@testing-library/react";

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
});

describe("authContext", () => {
    it("Comprobar que despues de hacer login, user y token obtienen valores", async () => {
        // Mock LoginRequest
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "fake-token" }),
          } as Response);

        // Mock MeRequest
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" }),
        } as Response);

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(async () => {
            await result.current.login({ email: "prueba@prueba.com", password: "1234" });
        });
        
        expect(result.current.token).toBe("fake-token");
        expect(result.current.user).toEqual({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" });
    });

    it("Comprobar al hacer logout, se vacían los valores de user y token", async () => {
        // Mock LoginRequest
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "fake-token" }),
          } as Response);

        // Mock MeRequest
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" }),
        } as Response);

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(async () => {
            await result.current.login({ email: "prueba@prueba.com", password: "1234" });
        });
        expect(result.current.token).toBe("fake-token");

        await act(async () => {
            await result.current.logout();
        });
        
        expect(result.current.token).toBeNull();
        expect(result.current.user).toBeNull();
    });

    it("Comprobar que cuando hay un token en localStorage al cargar, debería restaurar la sesión", async () => {
       localStorage.setItem("auth_token", "fake-token");

        // Mock MeRequest
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" }),
        } as Response);

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        // cuerpo vacío le dice a React: "espera a que terminen todos los efectos asíncronos pendientes"
        // y así finalmente llama a restoreSession()
        await act(async () => {});

        expect(result.current.token).toBe("fake-token");
        expect(result.current.user).toEqual({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" });

    });
})