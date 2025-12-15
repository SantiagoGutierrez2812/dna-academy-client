import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubject, getStudentGrades } from "../../services/subject.service";
import { getStudent } from "../../services/student.service";
import { createGrade, updateGrade, deleteGrade } from "../../services/grade.service";
import type { Subject } from "../../types/subject.types";
import type { Student } from "../../types/student.types";
import type { Grade } from "../../types/grade.types";

export default function StudentGrades() {
    const { id: subjectId, studentId } = useParams();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
    const [formData, setFormData] = useState({ value: "", description: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (subjectId && studentId) {
            loadData();
        }
    }, [subjectId, studentId]);

    async function loadData() {
        try {
            const [subjectData, studentData, gradesData] = await Promise.all([
                getSubject(Number(subjectId)),
                getStudent(Number(studentId)),
                getStudentGrades(Number(subjectId), Number(studentId)),
            ]);
            setSubject(subjectData);
            setStudent(studentData);
            setGrades(gradesData);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar datos");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleNewGrade() {
        setEditingGrade(null);
        setFormData({ value: "", description: "" });
        setShowForm(true);
    }

    function handleEditGrade(grade: Grade) {
        setEditingGrade(grade);
        setFormData({ value: grade.value.toString(), description: grade.description });
        setShowForm(true);
    }

    function handleCancelForm() {
        setShowForm(false);
        setEditingGrade(null);
        setFormData({ value: "", description: "" });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingGrade) {
                const updated = await updateGrade(editingGrade.id, {
                    value: Number(formData.value),
                    description: formData.description,
                });
                setGrades(grades.map(g => g.id === updated.id ? updated : g));
                toast.success("Nota actualizada exitosamente");
            } else {
                const gradesData = await getStudentGrades(Number(subjectId), Number(studentId));
                if (gradesData.length === 0) {
                    toast.error("El estudiante no está matriculado en esta materia");
                    setSubmitting(false);
                    return;
                }
                const newGrade = await createGrade({
                    value: Number(formData.value),
                    description: formData.description,
                    studentSubjectId: gradesData[0]?.studentSubjectId || 0,
                });
                setGrades([...grades, newGrade]);
                toast.success("Nota creada exitosamente");
            }
            handleCancelForm();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al guardar nota");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(gradeId: number) {
        if (!confirm("¿Estás seguro de eliminar esta nota?")) return;

        try {
            await deleteGrade(gradeId);
            setGrades(grades.filter(g => g.id !== gradeId));
            toast.success("Nota eliminada exitosamente");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al eliminar nota");
        }
    }

    if (loading) {
        return <div className="text-gray-600">Cargando...</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <Link to={`/my-subjects/${subjectId}/students`} className="text-blue-600 hover:text-blue-800 text-sm">
                    &larr; Volver a Estudiantes
                </Link>
                <h1 className="text-2xl font-bold text-gray-800 mt-2">
                    Notas de {student?.name}
                </h1>
                <p className="text-gray-600">Materia: {subject?.name}</p>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow p-6 mb-6 max-w-md">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingGrade ? "Editar Nota" : "Nueva Nota"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                                Valor (0-5)
                            </label>
                            <input
                                type="number"
                                id="value"
                                name="value"
                                value={formData.value}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                max="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={2}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {submitting ? "Guardando..." : "Guardar"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelForm}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Listado de Notas</h2>
                {!showForm && (
                    <button
                        onClick={handleNewGrade}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Agregar Nota
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Valor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grades.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                    No hay notas registradas
                                </td>
                            </tr>
                        ) : (
                            grades.map((grade) => (
                                <tr key={grade.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                                            grade.value >= 3 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}>
                                            {grade.value.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {grade.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditGrade(grade)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(grade.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
