import type { Student } from "./student.types";
import type { Grade } from "./grade.types";

export interface Subject {
    id: number;
    name: string;
    professionalId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSubjectDto {
    name: string;
    professionalId: number;
}

export interface UpdateSubjectDto {
    name?: string;
    professionalId?: number;
}

export interface SubjectResponse {
    message: string;
    data: {
        subject: Subject;
    };
}

export interface SubjectsResponse {
    message: string;
    data: {
        subjects: Subject[];
    };
}

export interface SubjectStudentsResponse {
    message: string;
    data: {
        students: Student[];
    };
}

export interface StudentGradesResponse {
    message: string;
    data: {
        grades: Grade[];
    };
}
