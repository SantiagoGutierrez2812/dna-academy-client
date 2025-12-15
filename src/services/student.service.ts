import { API_URL } from "./api";
import type {
    Student,
    CreateStudentDto,
    UpdateStudentDto,
    StudentResponse,
    StudentsResponse
} from "../types/student.types";

export async function getStudents(): Promise<Student[]> {
    const response = await fetch(`${API_URL}/students`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiantes");
    }

    const data: StudentsResponse = await response.json();
    return data.data.students;
}

export async function getStudent(id: number): Promise<Student> {
    const response = await fetch(`${API_URL}/students/${id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiante");
    }

    const data: StudentResponse = await response.json();
    return data.data.student;
}

export async function createStudent(dto: CreateStudentDto): Promise<Student> {
    const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear estudiante");
    }

    const data: StudentResponse = await response.json();
    return data.data.student;
}

export async function updateStudent(id: number, dto: UpdateStudentDto): Promise<Student> {
    const response = await fetch(`${API_URL}/students/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar estudiante");
    }

    const data: StudentResponse = await response.json();
    return data.data.student;
}

export async function deleteStudent(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar estudiante");
    }
}
