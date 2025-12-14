import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    // Rutas públicas
    {
        path: "/login",
        lazy: () => import("../pages/Login"),
    },
    // Rutas protegidas se agregarán aquí
]);
