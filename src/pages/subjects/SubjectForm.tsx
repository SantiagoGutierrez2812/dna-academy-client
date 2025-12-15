import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSubject, createSubject, updateSubject } from "../../services/subject.service";
import { getUsers } from "../../services/user.service";
import type { CreateSubjectDto, UpdateSubjectDto } from "../../types/subject.types";
import type { UserAdmin } from "../../types/user.types";

export default function SubjectForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [professionals, setProfessionals] = useState<UserAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        professionalId: "",
    });

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        try {
            const users = await getUsers();
            setProfessionals(users.filter(u => u.role === "PROFESSIONAL"));

            if (isEditing && id) {
                const subject = await getSubject(Number(id));
                setFormData({
                    name: subject.name,
                    professionalId: subject.professionalId.toString(),
                });
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar datos");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (isEditing && id) {
                const dto: UpdateSubjectDto = {
                    name: formData.name,
                    professionalId: Number(formData.professionalId),
                };
                await updateSubject(Number(id), dto);
                toast.success("Materia actualizada exitosamente");
            } else {
                const dto: CreateSubjectDto = {
                    name: formData.name,
                    professionalId: Number(formData.professionalId),
                };
                await createSubject(dto);
                toast.success("Materia creada exitosamente");
            }
            navigate("/subjects");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al guardar materia");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div className="text-gray-600">Cargando...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? "Editar Materia" : "Nueva Materia"}
            </h1>

            <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la Materia
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="professionalId" className="block text-sm font-medium text-gray-700 mb-1">
                            Profesional Asignado
                        </label>
                        <select
                            id="professionalId"
                            name="professionalId"
                            value={formData.professionalId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccionar profesional</option>
                            {professionals.map((professional) => (
                                <option key={professional.id} value={professional.id}>
                                    {professional.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {submitting ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/subjects")}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
