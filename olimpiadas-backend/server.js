/**
 * @file server.js
 * @description Punto de entrada principal del servidor Express.
 *              Define todas las rutas de la API REST y arranca el servidor HTTP.
 *              Tecnologías: Node.js, Express, PostgreSQL (via pool de conexiones).
 */

// Carga las variables de entorno desde el archivo .env (DB_HOST, PORT, etc.)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Pool de conexiones a PostgreSQL (configurado en src/config/database.js)
const pool = require("./src/config/database");
const personaRoutes = require("./src/routes/personaRoutes");
const colegioRoutes = require("./src/routes/colegioRoutes");
const tutorRoutes = require("./src/routes/tutorRoutes");
const participanteRoutes = require("./src/routes/participanteRoutes");
const olimpiadaRoutes = require("./src/routes/olimpiadaRoutes");
const areaRoutes = require("./src/routes/areaRoutes");
const inscripcionRoutes = require("./src/routes/inscripcionRoutes");
const pagoRoutes = require("./src/routes/pagoRoutes");
const resultadoRoutes = require("./src/routes/resultadoRoutes");

// Middleware centralizado de manejo de errores
const { errorHandler } = require("./src/middlewares/errorHandler");

// Instancia principal de la aplicación Express
const app = express();

// ─── MIDDLEWARES GLOBALES ──────────────────────────────────────────────────────

/**
 * Habilita CORS (Cross-Origin Resource Sharing) para que el frontend
 * en localhost:5173 pueda hacer peticiones al backend.
 * La URL del frontend se lee de la variable de entorno FRONTEND_URL.
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Permite envío de cookies/credenciales entre dominios
  }),
);

// Permite parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// ─── RUTAS: COLEGIOS ──────────────────────────────────────────────────────────

app.use("/api/colegios", colegioRoutes);

// ─── RUTAS: PERSONAS ──────────────────────────────────────────────────────────
app.use("/api/personas", personaRoutes);

// ─── RUTAS: TUTORES ───────────────────────────────────────────────────────────

app.use("/api/tutores", tutorRoutes);

// ─── RUTAS: PARTICIPANTES ─────────────────────────────────────────────────────

app.use("/api/participantes", participanteRoutes);

// ─── RUTAS: OLIMPIADAS ────────────────────────────────────────────────────────

app.use("/api/olimpiadas", olimpiadaRoutes);

// ─── RUTAS: ÁREAS ─────────────────────────────────────────────────────────────

app.use("/api/areas", areaRoutes);

// ─── RUTAS: INSCRIPCIONES ─────────────────────────────────────────────────────

app.use("/api/inscripciones", inscripcionRoutes);

// ─── RUTAS: PAGOS ─────────────────────────────────────────────────────────────

app.use("/api/pagos", pagoRoutes);

// ─── RUTAS: RESULTADOS ────────────────────────────────────────────────────────

app.use("/api/resultados", resultadoRoutes);

// ─── ARRANQUE DEL SERVIDOR ────────────────────────────────────────────────────

/**
 * Puerto en el que escucha el servidor.
 * Se toma de la variable de entorno PORT, o 3001 por defecto.
 */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`),
);

/**
 * Middleware de manejo de errores global.
 * DEBE ir después de todas las rutas para capturar errores que pasen
 * a través de next(error) en cualquier ruta.
 */
app.use(errorHandler);
