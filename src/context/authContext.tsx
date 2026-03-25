import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, } from "react";
import type { AuthUser, LoginRequest, RegisterRequest, } from "../types/auth";
import { clearToken, getToken, loginRequest, meRequest, registerRequest, saveToken, } from "../auth/authApi";

type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    loadingSession: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(getToken());
    const [loadingSession, setLoadingSession] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = getToken();

            if (!savedToken) {
                setLoadingSession(false);
                return;
            }

            try {
                const currentUser = await meRequest(savedToken);
                setUser(currentUser);
                setToken(savedToken);
            } catch {
                clearToken();
                setUser(null);
                setToken(null);
            } finally {
                setLoadingSession(false);
            }
        };

        restoreSession();
    }, []);

    const login = async (data: LoginRequest) => {
        const newToken = await loginRequest(data);
        saveToken(newToken);
        const currentUser = await meRequest(newToken);

        setToken(newToken);
        setUser(currentUser);
    };

    const register = async (data: RegisterRequest) => {
        const newToken = await registerRequest(data);
        saveToken(newToken);
        const currentUser = await meRequest(newToken);

        setToken(newToken);
        setUser(currentUser);
    };

    const logout = () => {
        clearToken();
        setUser(null);
        setToken(null);
    };

    const value = useMemo(
        () => ({
            user,
            token,
            loadingSession,
            login,
            register,
            logout,
        }),
        [user, token, loadingSession]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }

    return context;
}