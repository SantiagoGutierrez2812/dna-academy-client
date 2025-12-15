import { API_URL, fetchWithRefresh } from "./api";
import type {
    Student,
    CreateStudentDto,
    UpdateStudentDto,
    StudentResponse,
    StudentsResponse
} from "../types/student.types";

export async function getStudents(search?: string): Promise<Student[]> {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const url = `${API_URL}/students${params.toString() ? `?${params.toString()}` : ""}`;

    const response = await fetchWithRefresh(url);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiantes");
    }

    const data: StudentsResponse = await response.json();
    return data.data.students;
}

export async function getStudent(id: number): Promise<Student> {
    const response = await fetchWithRefresh(`${API_URL}/students/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiante");
    }

    const data: StudentResponse = await response.json();
    return data.data.student;
}

export async function createStudent(dto: CreateStudentDto): Promise<Student> {
    const response = await fetchWithRefresh(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
    const response = await fetchWithRefresh(`${API_URL}/students/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
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
    const response = await fetchWithRefresh(`${API_URL}/students/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar estudiante");
    }
}

export async function enrollStudent(studentId: number, subjectId: number): Promise<void> {
    const response = await fetchWithRefresh(`${API_URL}/students/${studentId}/subjects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al matricular estudiante");
    }
}

export async function unenrollStudent(studentId: number, subjectId: number): Promise<void> {
    const response = await fetchWithRefresh(`${API_URL}/students/${studentId}/subjects/${subjectId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al desmatricular estudiante");
    }
}
