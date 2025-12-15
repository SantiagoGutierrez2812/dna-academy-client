import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { preLogin, verifyLoginOtp } from "../services/auth.service";

type LoginStep = "credentials" | "otp";

export function Component() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState<LoginStep>("credentials");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCredentialsSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const otpCode = await preLogin({ email, password });
            toast.info(`Solo desarrollo: Tu código OTP es ${otpCode}. En producción se enviaría al email.`, {
                autoClose: 10000,
            });
            setStep("otp");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    }

    async function handleOtpSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const user = await verifyLoginOtp({ email, otp });
            login(user);
            navigate("/dashboard");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Código inválido");
        } finally {
            setLoading(false);
        }
    }

    function handleBackToCredentials() {
        setStep("credentials");
        setOtp("");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    DNA Academy
                </h1>

                {step === "credentials" ? (
                    <form onSubmit={handleCredentialsSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed mb-4"
                        >
                            {loading ? "Verificando..." : "Continuar"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            ¿Eres profesional?{" "}
                            <Link to="/register" className="text-blue-600 hover:text-blue-800">
                                Regístrate aquí
                            </Link>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <p className="text-sm text-gray-600 mb-4">
                            Ingresa el código de verificación enviado a <strong>{email}</strong>
                        </p>

                        <div className="mb-6">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                Código OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                                maxLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed mb-3"
                        >
                            {loading ? "Verificando..." : "Iniciar sesión"}
                        </button>

                        <button
                            type="button"
                            onClick={handleBackToCredentials}
                            className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
                        >
                            Volver
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
