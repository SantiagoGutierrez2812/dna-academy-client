import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/login",
        lazy: () => import("../pages/Login"),
    },
    {
        path: "/register",
        lazy: () => import("../pages/Register"),
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/dashboard" replace />,
                    },
                    {
                        path: "dashboard",
                        lazy: () => import("../pages/Dashboard").then(m => ({ Component: m.default })),
                    },
                    {
                        path: "users",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR"]} />,
                        children: [
                            {
                                index: true,
                                lazy: () => import("../pages/users/UserList").then(m => ({ Component: m.default })),
                            },
                            {
                                path: "new",
                                lazy: () => import("../pages/users/UserForm").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/edit",
                                lazy: () => import("../pages/users/UserForm").then(m => ({ Component: m.default })),
                            },
                        ],
                    },
                    {
                        path: "students",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR", "COORDINATOR"]} />,
                        children: [
                            {
                                index: true,
                                lazy: () => import("../pages/students/StudentList").then(m => ({ Component: m.default })),
                            },
                            {
                                path: "new",
                                lazy: () => import("../pages/students/StudentForm").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/edit",
                                lazy: () => import("../pages/students/StudentForm").then(m => ({ Component: m.default })),
                            },
                        ],
                    },
                    {
                        path: "subjects",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR", "COORDINATOR"]} />,
                        children: [
                            {
                                index: true,
                                lazy: () => import("../pages/subjects/SubjectList").then(m => ({ Component: m.default })),
                            },
                            {
                                path: "new",
                                lazy: () => import("../pages/subjects/SubjectForm").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/edit",
                                lazy: () => import("../pages/subjects/SubjectForm").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/students",
                                lazy: () => import("../pages/subjects/SubjectStudents").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/students/:studentId/grades",
                                lazy: () => import("../pages/subjects/StudentGrades").then(m => ({ Component: m.default })),
                            },
                        ],
                    },
                    {
                        path: "my-subjects",
                        element: <ProtectedRoute allowedRoles={["PROFESSIONAL"]} />,
                        children: [
                            {
                                index: true,
                                lazy: () => import("../pages/professional/MySubjects").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/students",
                                lazy: () => import("../pages/professional/SubjectStudents").then(m => ({ Component: m.default })),
                            },
                            {
                                path: ":id/students/:studentId/grades",
                                lazy: () => import("../pages/professional/StudentGrades").then(m => ({ Component: m.default })),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
