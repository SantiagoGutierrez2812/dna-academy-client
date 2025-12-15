import { API_URL, fetchWithRefresh } from "./api";
import type {
    Grade,
    CreateGradeDto,
    UpdateGradeDto,
    GradeResponse
} from "../types/grade.types";

export async function createGrade(dto: CreateGradeDto): Promise<Grade> {
    const response = await fetchWithRefresh(`${API_URL}/grades`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear nota");
    }

    const data: GradeResponse = await response.json();
    return data.data.grade;
}

export async function updateGrade(id: number, dto: UpdateGradeDto): Promise<Grade> {
    const response = await fetchWithRefresh(`${API_URL}/grades/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar nota");
    }

    const data: GradeResponse = await response.json();
    return data.data.grade;
}

export async function deleteGrade(id: number): Promise<void> {
    const response = await fetchWithRefresh(`${API_URL}/grades/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar nota");
    }
}
