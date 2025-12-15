import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthState, User } from "../types/auth.types";
import { getMe, logout as logoutService } from "../services/auth.service";

interface AuthContextType extends AuthState {
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        if (authState.isAuthenticated) {
            setIsLoading(false);
            return;
        }

        try {
            const user = await getMe();
            setAuthState({ user, isAuthenticated: true });
        } catch {
            setAuthState({ user: null, isAuthenticated: false });
        } finally {
            setIsLoading(false);
        }
    }

    const login = (user: User) => {
        setAuthState({ user, isAuthenticated: true });
        setIsLoading(false);
    };

    const logout = async () => {
        try {
            await logoutService();
        } finally {
            setAuthState({ user: null, isAuthenticated: false });
        }
    };

    return (
        <AuthContext.Provider value={{ ...authState, isLoading, login, logout }}>
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
