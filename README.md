# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

Una API simple para registrar usuarios y su historial de ejercicios, desarrollada con **Node.js** y **Express**. Cumple con los requisitos del proyecto _Exercise Tracker_ de **FreeCodeCamp**.

---

## Características

- Crear usuarios
- Registrar ejercicios con descripción, duración y fecha
- Consultar todos los usuarios registrados
- Ver el historial de ejercicios de un usuario con filtros opcionales (`from`, `to`, `limit`)

---

## Tecnologías

- Node.js
- Express
- Body-parser (incluido en Express 4.16+)
- Cors

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/TheMasterShoot/project-exercisetracker-microservice.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` si deseas especificar un puerto personalizado:

```
PORT=3000
```

4. Inicia el servidor:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`.

---

## Endpoints

### Crear usuario

```http
POST /api/users
Content-Type: application/x-www-form-urlencoded

Body:
username=NombreUsuario
```

### Obtener todos los usuarios

```http
GET /api/users
```

### Agregar ejercicio

```http
POST /api/users/:_id/exercises
Content-Type: application/x-www-form-urlencoded

Body:
description=Ejercicio
duration=60
date=1990-01-01 (opcional, formato yyyy-mm-dd)
```

### Obtener historial de ejercicios

```http
GET /api/users/:_id/logs
```

Parámetros opcionales (como query params):

- `from` (formato: yyyy-mm-dd)
- `to` (formato: yyyy-mm-dd)
- `limit` (número entero)

Ejemplo:

```
GET /api/users/123/logs?from=1990-01-01&to=2025-01-01&limit=5
```

---

## Pruebas

Este proyecto pasa los siguientes tests de FreeCodeCamp:

1. You should provide your own project, not the example URL.
2. You can POST to /api/users with form data username to create a new user.
3. The returned response from POST /api/users with form data username will be an object with username and _id properties.
4. You can make a GET request to /api/users to get a list of all users.
5. The GET request to /api/users returns an array.
6. Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
7. You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
8. The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
9. You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
10. A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
11. A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
12. Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
13. The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
14. The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
15. The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
16. You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
