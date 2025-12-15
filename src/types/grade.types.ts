export interface Grade {
    id: number;
    value: number;
    description: string;
    studentSubjectId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateGradeDto {
    value: number;
    description: string;
    studentSubjectId: number;
}

export interface UpdateGradeDto {
    value?: number;
    description?: string;
}

export interface GradeResponse {
    message: string;
    data: {
        grade: Grade;
    };
}

export interface GradesResponse {
    message: string;
    data: {
        grades: Grade[];
    };
}
