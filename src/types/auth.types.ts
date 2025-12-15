export type UserRole = "ADMINISTRATOR" | "COORDINATOR" | "PROFESSIONAL";

export interface User {
    id: number;
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

export interface PreLoginCredentials {
    email: string;
    password: string;
}

export interface VerifyOtpCredentials {
    email: string;
    otp: string;
}

export interface PreLoginResponse {
    message: string;
    data: {
        otp: string;
    };
}

export interface LoginResponse {
    message: string;
    data: {
        user: User;
    };
}

export interface MeResponse {
    message: string;
    data: {
        user: User;
    };
}

export interface RegisterCredentials {
    name: string;
    email: string;
    phoneNumber: string;
    documentNumber: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            role: UserRole;
        };
    };
}
