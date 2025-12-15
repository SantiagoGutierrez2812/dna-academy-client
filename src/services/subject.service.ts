import { API_URL, fetchWithRefresh } from "./api";
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
    const response = await fetchWithRefresh(`${API_URL}/subjects`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener materias");
    }

    const data: SubjectsResponse = await response.json();
    return data.data.subjects;
}

export async function getMySubjects(): Promise<Subject[]> {
    const response = await fetchWithRefresh(`${API_URL}/subjects/my-subjects`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener mis materias");
    }

    const data: SubjectsResponse = await response.json();
    return data.data.subjects;
}

export async function getSubject(id: number): Promise<Subject> {
    const response = await fetchWithRefresh(`${API_URL}/subjects/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener materia");
    }

    const data: SubjectResponse = await response.json();
    return data.data.subject;
}

export async function createSubject(dto: CreateSubjectDto): Promise<Subject> {
    const response = await fetchWithRefresh(`${API_URL}/subjects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
    const response = await fetchWithRefresh(`${API_URL}/subjects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
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
    const response = await fetchWithRefresh(`${API_URL}/subjects/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar materia");
    }
}

export async function getSubjectStudents(subjectId: number): Promise<Student[]> {
    const response = await fetchWithRefresh(`${API_URL}/subjects/${subjectId}/students`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener estudiantes de la materia");
    }

    const data: SubjectStudentsResponse = await response.json();
    return data.data.students;
}

export async function getStudentGrades(subjectId: number, studentId: number): Promise<{ studentSubjectId: number | null, grades: Grade[] }> {
    const response = await fetchWithRefresh(`${API_URL}/subjects/${subjectId}/students/${studentId}/grades`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener notas del estudiante");
    }

    const data: StudentGradesResponse = await response.json();
    return { studentSubjectId: data.data.studentSubjectId, grades: data.data.grades };
}
