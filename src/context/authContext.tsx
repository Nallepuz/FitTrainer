import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";
import { clearToken, getToken, loginRequest, meRequest, registerRequest, saveToken } from "../service/authService";

// TYPES ----------------------------------------------------------------------------------------------------------------
type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    loadingSession: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
};

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    loadingSession: boolean;
};

type AuthAction =
    | { type: "LOGIN"; payload: { user: AuthUser; token: string } }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "RESTORE_SESSION"; payload: { user: AuthUser; token: string } }
    | { type: "RESTORE_SESSION_FAILED" };

// REDUCER -------------------------------------------------------------------------------------------------------
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload.user, token: action.payload.token };
        case "LOGOUT":
            return { ...state, user: null, token: null };
        case "SET_LOADING":
            return { ...state, loadingSession: action.payload };
        case "RESTORE_SESSION":
            return { ...state, user: action.payload.user, token: action.payload.token, loadingSession: false };
        case "RESTORE_SESSION_FAILED":
            return { ...state, user: null, token: null, loadingSession: false };
        default:
            return state;
    }
}

// CONTEXT ------------------------------------------------------------------------------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: getToken(),
        loadingSession: true,
    });

    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = getToken();

            if (!savedToken) {
                dispatch({ type: "SET_LOADING", payload: false });
                return;
            }

            try {
                const currentUser = await meRequest(savedToken);
                dispatch({ type: "RESTORE_SESSION", payload: { user: currentUser, token: savedToken } });
            } catch {
                clearToken();
                dispatch({ type: "RESTORE_SESSION_FAILED" });
            }
        };

        restoreSession();
    }, []);

    const login = async (data: LoginRequest) => {
        const newToken = await loginRequest(data);
        saveToken(newToken);
        const currentUser = await meRequest(newToken);
        dispatch({ type: "LOGIN", payload: { user: currentUser, token: newToken } });
    };

    const register = async (data: RegisterRequest) => {
        const newToken = await registerRequest(data);
        saveToken(newToken);
        const currentUser = await meRequest(newToken);
        dispatch({ type: "LOGIN", payload: { user: currentUser, token: newToken } });
    };

    const logout = () => {
        clearToken();
        dispatch({ type: "LOGOUT" });
    };

    const value = useMemo(
        () => ({
            user: state.user,
            token: state.token,
            loadingSession: state.loadingSession,
            login,
            register,
            logout,
        }),
        [state.user, state.token, state.loadingSession]
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