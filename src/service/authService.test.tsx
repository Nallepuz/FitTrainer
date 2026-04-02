import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginRequest, registerRequest, meRequest, saveToken, getToken, clearToken } from "./authService";
vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
    vi.resetAllMocks();
});

describe("authService", () => {
    it("Comprobar si al logear nos proporciona un token", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "fake-token" }),
          } as Response);

          const token = await loginRequest({ email: "prueba@prueba.com", password: "1234" });
          expect(token).toBe("fake-token");
    });

    it("Comprobar si al logear de forma incorrecta no proporciona un token", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
          } as Response);

          await expect(loginRequest({email: "pruebaIncorrecta", password: "1234"})).rejects.toThrow("Credenciales incorrectas.");
    });

    it("Comprobar si al registrar nos logea y proporciona un token", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "fake-token" }),
          } as Response);

          const token = await registerRequest({ name: "prueba", email: "prueba@prueba.com", password: "1234" });
          expect(token).toBe("fake-token");
    });

    it("Comprobar si al registrar de forma incorrecta no nos logea y no proporciona un token", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
          } as Response);

          await expect(registerRequest({ name: "prueba", email: "pruebaIncorrecta", password: "1234"})).rejects.toThrow("No se pudo registrar el usuario.");
    });

    it("Comprobar si una vez logeado podemos acceder a la página MePage", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" }),
          } as Response);

          const user = await meRequest( "fake-token" );
          expect(user).toEqual({ id: 1, name: "Prueba", email: "prueba@prueba.com", role: "user" });
    });

    it("Comprobar si al no estar logeado no podemos acceder a la página MePage", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            json: async () => (null),
          } as Response);

          await expect(meRequest("token-invalido")).rejects.toThrow("Token inválido o caducado.");
    });

    it("Comprobar si guarda el token en localStorage", () => {
        saveToken("fake-token");
        expect(localStorage.getItem("auth_token")).toBe("fake-token");
    });

    it("Comprobar si visualiza el token de localStorage", () => {
        saveToken("fake-token");
        const token = getToken();
        expect(token).toBe("fake-token");
    });

    it("Comprobar si borra el token de localStorage", () => {
        saveToken("fake-token");
        clearToken();
        expect(localStorage.getItem("auth_token")).toBeNull;
    });
})