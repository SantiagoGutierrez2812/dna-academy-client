import { API_URL } from "./api";
import type {
    UserAdmin,
    CreateUserDto,
    UpdateUserDto,
    UserResponse,
    UsersResponse
} from "../types/user.types";

export async function getUsers(): Promise<UserAdmin[]> {
    const response = await fetch(`${API_URL}/users`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener usuarios");
    }

    const data: UsersResponse = await response.json();
    return data.data.users;
}

export async function getUser(id: number): Promise<UserAdmin> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener usuario");
    }

    const data: UserResponse = await response.json();
    return data.data.user;
}

export async function createUser(dto: CreateUserDto): Promise<UserAdmin> {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear usuario");
    }

    const data: UserResponse = await response.json();
    return data.data.user;
}

export async function updateUser(id: number, dto: UpdateUserDto): Promise<UserAdmin> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar usuario");
    }

    const data: UserResponse = await response.json();
    return data.data.user;
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar usuario");
    }
}
