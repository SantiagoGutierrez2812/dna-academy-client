import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/auth.types";

interface NavItem {
    label: string;
    path: string;
    roles: UserRole[];
}

const navItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", roles: ["ADMINISTRATOR", "COORDINATOR", "PROFESSIONAL"] },
    { label: "Usuarios", path: "/users", roles: ["ADMINISTRATOR"] },
    { label: "Estudiantes", path: "/students", roles: ["ADMINISTRATOR", "COORDINATOR"] },
    { label: "Materias", path: "/subjects", roles: ["ADMINISTRATOR", "COORDINATOR"] },
    { label: "Mis Materias", path: "/my-subjects", roles: ["PROFESSIONAL"] },
];

export default function MainLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const filteredNavItems = navItems.filter(
        (item) => user && item.roles.includes(user.role)
    );

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold">DNA Academy</h1>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {filteredNavItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `block px-4 py-2 rounded transition-colors ${
                                            isActive
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-300 hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <div className="mb-3">
                        <p className="text-sm text-gray-400">Sesión iniciada como:</p>
                        <p className="font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.role}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
