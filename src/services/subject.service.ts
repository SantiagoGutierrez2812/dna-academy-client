import { API_URL } from "./api";
import type {
    Subject,
    CreateSubjectDto,
    UpdateSubjectDto,
    SubjectResponse,
    SubjectsResponse,
    SubjectStudentsResponse,
    StudentGradesResponse
} from "../types/subject.types";
import type { Student } from "../types/student.types";
import type { Grade } from "../types/grade.types";

export async function getSubjects(): Promise<Subject[]> {
    const response = await fetch(`${API_URL}/subjects`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener materias");
    }

    const data: SubjectsResponse = await response.json();
    return data.data.subjects;
}

export async function getMySubjects(): Promise<Subject[]> {
    const response = await fetch(`${API_URL}/subjects/my-subjects`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener mis materias");
    }

    const data: SubjectsResponse = await response.json();
    return data.data.subjects;
}

export async function getSubject(id: number): Promise<Subject> {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener materia");
    }

    const data: SubjectResponse = await response.json();
    return data.data.subject;
}

export async function createSubject(dto: CreateSubjectDto): Promise<Subject> {
    const response = await fetch(`${API_URL}/subjects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear materia");
    }

    const data: SubjectResponse = await response.json();
    return data.data.subject;
}

export async function updateSubject(id: number, dto: UpdateSubjectDto): Promise<Subject> {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar materia");
    }

    const data: SubjectResponse = await response.json();
    return data.data.subject;
}

export async function deleteSubject(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar materia");
    }
}

export async function getSubjectStudents(subjectId: number): Promise<Student[]> {
    const response = await fetch(`${API_URL}/subjects/${subjectId}/students`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiantes de la materia");
    }

    const data: SubjectStudentsResponse = await response.json();
    return data.data.students;
}

export async function getStudentGrades(subjectId: number, studentId: number): Promise<Grade[]> {
    const response = await fetch(`${API_URL}/subjects/${subjectId}/students/${studentId}/grades`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener notas del estudiante");
    }

    const data: StudentGradesResponse = await response.json();
    return data.data.grades;
}
