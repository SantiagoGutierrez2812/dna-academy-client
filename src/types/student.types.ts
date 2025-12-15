export interface Student {
    id: number;
    name: string;
    email: string;
    countryId: number;
    documentNumber: string;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateStudentDto {
    name: string;
    email: string;
    countryId: number;
    documentNumber: string;
}

export interface UpdateStudentDto {
    name?: string;
    email?: string;
    countryId?: number;
    documentNumber?: string;
}

export interface StudentResponse {
    message: string;
    data: {
        student: Student;
    };
}

export interface StudentsResponse {
    message: string;
    data: {
        students: Student[];
    };
}
