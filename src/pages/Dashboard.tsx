import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Bienvenido, {user?.name}</h2>
                <p className="text-gray-600">
                    Has iniciado sesión como <span className="font-medium">{user?.role}</span>
                </p>
            </div>
        </div>
    );
}
