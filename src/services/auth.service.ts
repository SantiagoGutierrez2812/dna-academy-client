import { API_URL, fetchWithRefresh } from "./api";
import type {
    User,
    PreLoginCredentials,
    VerifyOtpCredentials,
    PreLoginResponse,
    LoginResponse,
    MeResponse,
    RegisterCredentials
} from "../types/auth.types";

export async function preLogin(credentials: PreLoginCredentials): Promise<string> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al iniciar sesión");
    }

    const data: PreLoginResponse = await response.json();
    return data.data.otp;
}

export async function verifyLoginOtp(credentials: VerifyOtpCredentials): Promise<User> {
    const response = await fetch(`${API_URL}/auth/verify-otp-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Código de verificación inválido");
    }

    const data: LoginResponse = await response.json();
    return data.data.user;
}

export async function logout(): Promise<void> {
    const response = await fetchWithRefresh(`${API_URL}/auth/logout`, {
        method: "POST",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al cerrar sesión");
    }
}

export async function getMe(): Promise<User> {
    const response = await fetchWithRefresh(`${API_URL}/auth/me`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener usuario");
    }

    const data: MeResponse = await response.json();
    return data.data.user;
}

export async function register(credentials: RegisterCredentials): Promise<void> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al registrar profesional");
    }
}
