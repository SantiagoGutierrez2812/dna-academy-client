import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMySubjects } from "../../services/subject.service";
import type { Subject } from "../../types/subject.types";

export default function MySubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {
        try {
            const data = await getMySubjects();
            setSubjects(data);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar materias");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-gray-600">Cargando...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Materias</h1>

            {subjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                    No tienes materias asignadas
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject) => (
                        <Link
                            key={subject.id}
                            to={`/my-subjects/${subject.id}/students`}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                {subject.name}
                            </h2>
                            <p className="text-sm text-blue-600 mt-2">
                                Ver estudiantes &rarr;
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
