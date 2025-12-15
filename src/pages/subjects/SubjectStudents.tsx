import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubject, getSubjectStudents } from "../../services/subject.service";
import { getStudents, enrollStudent, unenrollStudent } from "../../services/student.service";
import type { Subject } from "../../types/subject.types";
import type { Student } from "../../types/student.types";

export default function SubjectStudents() {
    const { id } = useParams();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    const [showEnrollForm, setShowEnrollForm] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    async function loadData() {
        try {
            const [subjectData, studentsData, allStudentsData] = await Promise.all([
                getSubject(Number(id)),
                getSubjectStudents(Number(id)),
                getStudents(),
            ]);
            setSubject(subjectData);
            setStudents(studentsData);
            setAllStudents(allStudentsData);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar datos");
        } finally {
            setLoading(false);
        }
    }

    const availableStudents = allStudents.filter(
        (s) => !students.some((enrolled) => enrolled.id === s.id)
    );

    async function handleEnroll(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedStudentId) return;

        setEnrolling(true);
        try {
            await enrollStudent(Number(selectedStudentId), Number(id));
            toast.success("Estudiante matriculado exitosamente");
            setShowEnrollForm(false);
            setSelectedStudentId("");
            await loadData();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al matricular estudiante");
        } finally {
            setEnrolling(false);
        }
    }

    async function handleUnenroll(studentId: number) {
        if (!confirm("¿Estás seguro de desmatricular este estudiante?")) return;

        try {
            await unenrollStudent(studentId, Number(id));
            setStudents(students.filter((s) => s.id !== studentId));
            toast.success("Estudiante desmatriculado exitosamente");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al desmatricular estudiante");
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
                <button
                    onClick={() => setShowEnrollForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Matricular Estudiante
                </button>
            </div>

            {showEnrollForm && (
                <div className="bg-white rounded-lg shadow p-6 mb-6 max-w-md">
                    <h2 className="text-lg font-semibold mb-4">Matricular Estudiante</h2>
                    <form onSubmit={handleEnroll}>
                        <div className="mb-4">
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                                Seleccionar Estudiante
                            </label>
                            <select
                                id="studentId"
                                value={selectedStudentId}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Seleccionar...</option>
                                {availableStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} - {student.documentNumber}
                                    </option>
                                ))}
                            </select>
                            {availableStudents.length === 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    No hay estudiantes disponibles para matricular
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={enrolling || !selectedStudentId}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {enrolling ? "Matriculando..." : "Matricular"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowEnrollForm(false);
                                    setSelectedStudentId("");
                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Ver Notas
                                        </Link>
                                        <button
                                            onClick={() => handleUnenroll(student.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Desmatricular
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
