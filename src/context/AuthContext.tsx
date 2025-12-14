import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthState, User } from "../types/auth.types";

interface AuthContextType extends AuthState {
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });

    const login = (user: User) => {
        setAuthState({ user, isAuthenticated: true });
    };

    const logout = () => {
        setAuthState({ user: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
}
