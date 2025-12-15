import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getStudent, createStudent, updateStudent } from "../../services/student.service";
import { getCountries } from "../../services/country.service";
import type { CreateStudentDto, UpdateStudentDto } from "../../types/student.types";
import type { Country } from "../../types/country.types";

export default function StudentForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        documentNumber: "",
        countryId: "",
    });

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        try {
            const countriesData = await getCountries();
            setCountries(countriesData);

            if (isEditing && id) {
                const student = await getStudent(Number(id));
                setFormData({
                    name: student.name,
                    email: student.email,
                    documentNumber: student.documentNumber,
                    countryId: student.countryId.toString(),
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
                const dto: UpdateStudentDto = {
                    name: formData.name,
                    email: formData.email,
                    documentNumber: formData.documentNumber,
                    countryId: Number(formData.countryId),
                };
                await updateStudent(Number(id), dto);
                toast.success("Estudiante actualizado exitosamente");
            } else {
                const dto: CreateStudentDto = {
                    name: formData.name,
                    email: formData.email,
                    documentNumber: formData.documentNumber,
                    countryId: Number(formData.countryId),
                };
                await createStudent(dto);
                toast.success("Estudiante creado exitosamente");
            }
            navigate("/students");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al guardar estudiante");
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
                {isEditing ? "Editar Estudiante" : "Nuevo Estudiante"}
            </h1>

            <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
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

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Documento
                        </label>
                        <input
                            type="text"
                            id="documentNumber"
                            name="documentNumber"
                            value={formData.documentNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="countryId" className="block text-sm font-medium text-gray-700 mb-1">
                            País
                        </label>
                        <select
                            id="countryId"
                            name="countryId"
                            value={formData.countryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccionar país</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
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
                            onClick={() => navigate("/students")}
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
