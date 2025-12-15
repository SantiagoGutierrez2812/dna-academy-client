import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/users/UserList";
import UserForm from "../pages/users/UserForm";
import StudentList from "../pages/students/StudentList";
import StudentForm from "../pages/students/StudentForm";
import SubjectList from "../pages/subjects/SubjectList";
import SubjectForm from "../pages/subjects/SubjectForm";
import SubjectStudents from "../pages/subjects/SubjectStudents";
import StudentGrades from "../pages/subjects/StudentGrades";
import MySubjects from "../pages/professional/MySubjects";
import ProfessionalSubjectStudents from "../pages/professional/SubjectStudents";
import ProfessionalStudentGrades from "../pages/professional/StudentGrades";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
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
                        element: <Dashboard />,
                    },
                    {
                        path: "users",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR"]} />,
                        children: [
                            {
                                index: true,
                                element: <UserList />,
                            },
                            {
                                path: "new",
                                element: <UserForm />,
                            },
                            {
                                path: ":id/edit",
                                element: <UserForm />,
                            },
                        ],
                    },
                    {
                        path: "students",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR", "COORDINATOR"]} />,
                        children: [
                            {
                                index: true,
                                element: <StudentList />,
                            },
                            {
                                path: "new",
                                element: <StudentForm />,
                            },
                            {
                                path: ":id/edit",
                                element: <StudentForm />,
                            },
                        ],
                    },
                    {
                        path: "subjects",
                        element: <ProtectedRoute allowedRoles={["ADMINISTRATOR", "COORDINATOR"]} />,
                        children: [
                            {
                                index: true,
                                element: <SubjectList />,
                            },
                            {
                                path: "new",
                                element: <SubjectForm />,
                            },
                            {
                                path: ":id/edit",
                                element: <SubjectForm />,
                            },
                            {
                                path: ":id/students",
                                element: <SubjectStudents />,
                            },
                            {
                                path: ":id/students/:studentId/grades",
                                element: <StudentGrades />,
                            },
                        ],
                    },
                    {
                        path: "my-subjects",
                        element: <ProtectedRoute allowedRoles={["PROFESSIONAL"]} />,
                        children: [
                            {
                                index: true,
                                element: <MySubjects />,
                            },
                            {
                                path: ":id/students",
                                element: <ProfessionalSubjectStudents />,
                            },
                            {
                                path: ":id/students/:studentId/grades",
                                element: <ProfessionalStudentGrades />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
