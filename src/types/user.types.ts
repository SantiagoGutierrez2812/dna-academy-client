import type { UserRole } from "./auth.types";

export interface UserAdmin {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    documentNumber: string;
    role: UserRole;
    active: boolean;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
    phoneNumber: string;
    documentNumber: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    phoneNumber?: string;
    documentNumber?: string;
    password?: string;
    role?: UserRole;
    active?: boolean;
}

export interface UserResponse {
    message: string;
    data: {
        user: UserAdmin;
    };
}

export interface UsersResponse {
    message: string;
    data: {
        users: UserAdmin[];
    };
}
