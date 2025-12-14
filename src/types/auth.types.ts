export type UserRole = "ADMINISTRATOR" | "COORDINATOR" | "PROFESSIONAL";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    documentNumber: string;
    phoneNumber: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}
