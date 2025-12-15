import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubjects, deleteSubject } from "../../services/subject.service";
import type { Subject } from "../../types/subject.types";

export default function SubjectList() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {
        try {
            const data = await getSubjects();
            setSubjects(data);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar materias");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("¿Estás seguro de eliminar esta materia?")) return;

        try {
            await deleteSubject(id);
            setSubjects(subjects.filter(s => s.id !== id));
            toast.success("Materia eliminada exitosamente");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al eliminar materia");
        }
    }

    if (loading) {
        return <div className="text-gray-600">Cargando...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Materias</h1>
                <Link
                    to="/subjects/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Nueva Materia
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subjects.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                                    No hay materias registradas
                                </td>
                            </tr>
                        ) : (
                            subjects.map((subject) => (
                                <tr key={subject.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {subject.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/subjects/${subject.id}/students`}
                                            className="text-green-600 hover:text-green-900 mr-4"
                                        >
                                            Ver Estudiantes
                                        </Link>
                                        <Link
                                            to={`/subjects/${subject.id}/edit`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(subject.id)}
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
