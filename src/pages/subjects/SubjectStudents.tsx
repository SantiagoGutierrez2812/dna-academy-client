import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubject, getSubjectStudents } from "../../services/subject.service";
import type { Subject } from "../../types/subject.types";
import type { Student } from "../../types/student.types";

export default function SubjectStudents() {
    const { id } = useParams();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    async function loadData() {
        try {
            const [subjectData, studentsData] = await Promise.all([
                getSubject(Number(id)),
                getSubjectStudents(Number(id)),
            ]);
            setSubject(subjectData);
            setStudents(studentsData);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar datos");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-gray-600">Cargando...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Link to="/subjects" className="text-blue-600 hover:text-blue-800 text-sm">
                        &larr; Volver a Materias
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">
                        Estudiantes de {subject?.name}
                    </h1>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Documento
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    No hay estudiantes matriculados en esta materia
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {student.documentNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/subjects/${id}/students/${student.id}/grades`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Ver Notas
                                        </Link>
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
