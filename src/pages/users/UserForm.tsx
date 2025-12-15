import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, createUser, updateUser } from "../../services/user.service";
import type { CreateUserDto, UpdateUserDto } from "../../types/user.types";
import type { UserRole } from "../../types/auth.types";

export default function UserForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        documentNumber: "",
        password: "",
        role: "" as UserRole | "",
        active: true,
    });

    useEffect(() => {
        if (isEditing && id) {
            loadUser();
        }
    }, [id]);

    async function loadUser() {
        try {
            const user = await getUser(Number(id));
            setFormData({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                documentNumber: user.documentNumber,
                password: "",
                role: user.role,
                active: user.active,
            });
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al cargar usuario");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (isEditing && id) {
                const dto: UpdateUserDto = {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    documentNumber: formData.documentNumber,
                    role: formData.role as UserRole,
                    active: formData.active,
                };
                if (formData.password) {
                    dto.password = formData.password;
                }
                await updateUser(Number(id), dto);
                toast.success("Usuario actualizado exitosamente");
            } else {
                const dto: CreateUserDto = {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    documentNumber: formData.documentNumber,
                    password: formData.password,
                    role: formData.role as UserRole,
                };
                await createUser(dto);
                toast.success("Usuario creado exitosamente");
            }
            navigate("/users");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al guardar usuario");
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
                {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
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
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
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

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña {isEditing && "(dejar vacío para mantener)"}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={!isEditing}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Rol
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="ADMINISTRATOR">Administrador</option>
                            <option value="COORDINATOR">Coordinador</option>
                            <option value="PROFESSIONAL">Profesional</option>
                        </select>
                    </div>

                    {isEditing && (
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">Usuario activo</span>
                            </label>
                        </div>
                    )}

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
                            onClick={() => navigate("/users")}
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
