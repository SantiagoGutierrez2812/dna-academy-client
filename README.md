# DNA Academy Client

Interfaz de usuario para el sistema de gestión académica DNA Academy. Aplicación SPA desarrollada con React como prueba técnica para DNA Music.

## Descripción del Proyecto

DNA Academy Client es la interfaz web que permite a administradores, coordinadores y profesionales gestionar el sistema académico. Incluye autenticación con OTP, gestión de usuarios, estudiantes, materias y calificaciones con una interfaz intuitiva y responsiva.

### Características Principales

- Autenticación con verificación OTP
- Dashboard personalizado según rol
- Gestión completa de usuarios (CRUD)
- Gestión de estudiantes con búsqueda en tiempo real
- Gestión de materias y asignación de profesores
- Sistema de calificaciones por materia/estudiante
- Matriculación y desmatriculación de estudiantes
- Refresh automático de tokens expirados
- Interfaz responsiva con Tailwind CSS

## Arquitectura

El proyecto sigue una arquitectura basada en componentes con separación de responsabilidades:

```
src/
├── components/       # Componentes reutilizables
│   └── ProtectedRoute.tsx  # HOC para rutas protegidas
├── context/          # Contextos de React
│   └── AuthContext.tsx     # Estado global de autenticación
├── layouts/          # Layouts de la aplicación
│   ├── AuthLayout.tsx      # Layout para login/register
│   └── MainLayout.tsx      # Layout principal con sidebar
├── pages/            # Páginas/vistas de la aplicación
│   ├── students/     # Páginas de estudiantes
│   ├── subjects/     # Páginas de materias
│   ├── users/        # Páginas de usuarios
│   ├── professional/ # Páginas exclusivas para profesionales
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── router/           # Configuración de rutas
│   └── index.tsx
├── services/         # Servicios de API
│   ├── api.ts        # Configuración base y fetchWithRefresh
│   ├── auth.service.ts
│   ├── student.service.ts
│   ├── subject.service.ts
│   ├── user.service.ts
│   ├── grade.service.ts
│   └── country.service.ts
├── types/            # Tipos TypeScript
│   ├── auth.types.ts
│   ├── student.types.ts
│   ├── subject.types.ts
│   ├── user.types.ts
│   ├── grade.types.ts
│   └── country.types.ts
├── App.tsx           # Componente raíz
├── main.tsx          # Punto de entrada
└── index.css         # Estilos globales
```

### Patrones Utilizados

- **Context API**: Estado global para autenticación
- **Custom Hooks**: Reutilización de lógica (useAuth)
- **Service Layer**: Abstracción de llamadas API
- **Protected Routes**: Control de acceso por rol
- **Fetch with Refresh**: Renovación automática de tokens

## Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 19.x | Librería de UI |
| TypeScript | 5.9 | Superset tipado de JavaScript |
| Vite | 7.x | Build tool y dev server |
| React Router | 7.x | Enrutamiento SPA |
| Tailwind CSS | 4.x | Framework de estilos utility-first |
| React Toastify | 11.x | Notificaciones toast |

## Pasos de Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Backend corriendo (dna-academy-api)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/SantiagoGutierrez2812/dna-academy-client.git
cd dna-academy-client
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con la URL del backend
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

### Descripción de Variables

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API | http://localhost:3000/api |

## Modo de Ejecución

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con hot-reload en `http://localhost:5173`

### Producción
```bash
npm run build
npm run preview
```
Compila la aplicación para producción y la sirve localmente.

### Linting
```bash
npm run lint
```
Ejecuta ESLint para verificar el código.

## Usuarios de Prueba

| Email | Contraseña | Rol | Acceso |
|-------|------------|-----|--------|
| admin@gmail.com | Pa55w.rd | ADMINISTRATOR | Total |
| coordinador@gmail.com | Pa55w.rd | COORDINATOR | Gestión académica |
| profesor1@gmail.com | Pa55w.rd | PROFESSIONAL | Sus materias |
| profesor2@gmail.com | Pa55w.rd | PROFESSIONAL | Sus materias |
| profesor3@gmail.com | Pa55w.rd | PROFESSIONAL | Sus materias |

### Funcionalidades por Rol

#### ADMINISTRATOR
- Gestión completa de usuarios
- Gestión de estudiantes
- Gestión de materias
- Asignación de profesores
- Ver y gestionar notas

#### COORDINATOR
- Gestión de estudiantes
- Gestión de materias
- Matriculación de estudiantes
- Ver y gestionar notas

#### PROFESSIONAL
- Ver materias asignadas
- Ver estudiantes de sus materias
- Crear, editar y eliminar notas

## Estructura del Repositorio

```
dna-academy-client/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Recursos (imágenes, iconos)
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contextos de React
│   ├── layouts/         # Layouts de la aplicación
│   ├── pages/           # Páginas de la aplicación
│   │   ├── students/    # StudentList, StudentForm
│   │   ├── subjects/    # SubjectList, SubjectForm, SubjectStudents, StudentGrades
│   │   ├── users/       # UserList, UserForm
│   │   └── professional/# MySubjects, SubjectStudents, StudentGrades
│   ├── router/          # Configuración de rutas
│   ├── services/        # Servicios de comunicación con API
│   ├── types/           # Definiciones de tipos TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Flujo de Autenticación

1. **Login**: Usuario ingresa email y contraseña
2. **OTP**: Se genera y muestra un código de verificación (simulado)
3. **Verificación**: Usuario ingresa el OTP
4. **Tokens**: Se almacenan access y refresh tokens en cookies HttpOnly
5. **Refresh**: Cuando el access token expira, se renueva automáticamente
6. **Logout**: Se limpian las cookies y se redirige al login

### Refresh Automático de Tokens

El sistema implementa `fetchWithRefresh` que:
- Intercepta respuestas 401 (Unauthorized)
- Intenta renovar el access token
- Reintenta la petición original si el refresh es exitoso
- Redirige al login si el refresh falla

## Rutas de la Aplicación

### Públicas
- `/login` - Inicio de sesión
- `/register` - Registro de profesionales

### Protegidas (requieren autenticación)
- `/` - Dashboard
- `/users` - Lista de usuarios (ADMIN)
- `/users/new` - Crear usuario (ADMIN)
- `/users/:id/edit` - Editar usuario (ADMIN)
- `/students` - Lista de estudiantes
- `/students/new` - Crear estudiante
- `/students/:id/edit` - Editar estudiante
- `/subjects` - Lista de materias
- `/subjects/new` - Crear materia
- `/subjects/:id/edit` - Editar materia
- `/subjects/:id/students` - Estudiantes de una materia
- `/subjects/:id/students/:studentId/grades` - Notas del estudiante
- `/my-subjects` - Mis materias (PROFESSIONAL)
- `/my-subjects/:id/students` - Estudiantes de mi materia
- `/my-subjects/:id/students/:studentId/grades` - Notas

## Notas Adicionales

### API Externa de Países
El selector de país en el formulario de estudiantes consume datos de una API externa (RestCountries) a través del backend. Esto se indica con una anotación en el formulario.

### Búsqueda de Estudiantes
La lista de estudiantes incluye un buscador que filtra en tiempo real por nombre, email o documento. La búsqueda se realiza en el servidor con debounce de 300ms.

## Licencia

Este proyecto fue desarrollado como prueba técnica para DNA Music.
