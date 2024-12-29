# 0Gaming Challenge

## Descripción

Esta aplicación Fullstack permite la gestión de usuarios mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar) con autenticación basada en JSON Web Tokens (JWT). El backend está desarrollado con **NestJS** y el frontend con **React** utilizando **Vite**. La aplicación se conecta a una base de datos **MongoDB** para almacenar la información de los usuarios.


## Tecnologías Utilizadas

### Backend

- **NestJS**: Framework para construir aplicaciones Node.js eficientes y escalables.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos de usuarios.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **Passport**: Middleware de autenticación para Node.js.
- **JWT (JSON Web Tokens)**: Estándar abierto para transmitir información segura entre partes.
- **bcrypt**: Biblioteca para hashear contraseñas.

### Frontend

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción para proyectos frontend.
- **React Router**: Librería para manejar rutas en aplicaciones React.
- **Axios**: Cliente HTTP para hacer peticiones al backend.
- **Bootstrap**: Framework de CSS para estilizar la interfaz.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- **Git**
- **Cuenta en MongoDB Atlas** 

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/0gaming-challenge.git
cd 0gaming-challenge


CONFIGURAR BACKEND

1-cd backend en consola
2-npm install
3-Crear un archivo .env en la raiz de la carpeta backend
MONGO_URI=mongodb+srv://juanncarracedo7:admin@cluster0.tcbhw.mongodb.net/
JWT_SECRET=EstaEsMiSuperClaveSecreta
PORT=3001

4-npm run start:dev (INICIAR SERVIDOR)

CONFIGURAR FRONTEND

1-cd frontend en consola
2-npm install
3-Crear un archivo .env en la raiz de la carpeta frontend
VITE_API_URL=http://localhost:3001
4-npm run dev

