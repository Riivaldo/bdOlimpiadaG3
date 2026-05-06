/**
 * @file src/middlewares/errorHandler.js
 * @description Middleware centralizado de manejo de errores y sistema de logging.
 *
 * En Express, un middleware de error se diferencia de uno normal por tener
 * 4 parámetros: (err, req, res, next). Express lo invoca automáticamente
 * cuando alguna ruta llama a next(error).
 *
 * Winston es una biblioteca de logging que permite registrar mensajes
 * en consola y en archivos simultáneamente, con distintos niveles de severidad.
 */

const winston = require("winston");

// ─── CONFIGURACIÓN DEL LOGGER ─────────────────────────────────────────────────

/**
 * Crea una instancia del logger de Winston con:
 * - Nivel mínimo: "info" (registra info, warn y error, pero no debug)
 * - Formato combinado: agrega timestamp, stack trace en errores y serializa a JSON
 * - Tres transportes (destinos de salida):
 *     1. Consola        → útil durante desarrollo
 *     2. error.log      → solo errores (nivel "error")
 *     3. combined.log   → todos los niveles (info, warn, error)
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),              // Agrega campo "timestamp" a cada log
    winston.format.errors({ stack: true }), // Incluye el stack trace en errores
    winston.format.json(),                  // Serializa el log completo como JSON
  ),
  transports: [
    new winston.transports.Console(),                                        // Consola
    new winston.transports.File({ filename: "error.log", level: "error" }), // Solo errores
    new winston.transports.File({ filename: "combined.log" }),               // Todo
  ],
});

// ─── MIDDLEWARE DE ERRORES ────────────────────────────────────────────────────

/**
 * Middleware de manejo de errores global.
 *
 * @param {Error}    err  - El objeto de error capturado (puede tener .status y .message)
 * @param {Request}  req  - Objeto de solicitud HTTP (no se usa directamente aquí)
 * @param {Response} res  - Objeto de respuesta HTTP para enviar la respuesta al cliente
 * @param {Function} next - Función next (requerida por Express para reconocer el middleware de error)
 *
 * Responde siempre con JSON en el formato:
 * { "error": { "message": "descripción del error" } }
 */
const errorHandler = (err, req, res, next) => {
  // Registra el error en los archivos de log con su stack trace completo
  logger.error(err.message, { stack: err.stack });

  // Envía la respuesta HTTP con el código de estado del error o 500 por defecto
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Error interno del servidor",
    },
  });
};

// Exporta tanto el middleware como el logger
// El logger puede importarse en otros módulos para registrar eventos
module.exports = { errorHandler, logger };
