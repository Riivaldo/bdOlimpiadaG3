/**
 * @file src/config/database.js
 * @description Configuración y exportación del pool de conexiones a PostgreSQL.
 *
 * Un "pool" mantiene múltiples conexiones abiertas y las reutiliza,
 * evitando el costo de abrir/cerrar una conexión en cada petición HTTP.
 *
 * Las credenciales se leen desde variables de entorno definidas en .env:
 *   DB_HOST     → dirección del servidor PostgreSQL (ej: localhost)
 *   DB_PORT     → puerto de PostgreSQL (por defecto: 5432)
 *   DB_NAME     → nombre de la base de datos (ej: bdolimpiada)
 *   DB_USER     → usuario de la base de datos
 *   DB_PASSWORD → contraseña del usuario
 */

const { Pool } = require("pg"); // Cliente oficial de PostgreSQL para Node.js
require("dotenv").config(); // Carga las variables del archivo .env

// Crea el pool con las credenciales del entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/**
 * Verifica la conexión al iniciar la aplicación.
 * Si falla (credenciales incorrectas, servidor apagado, etc.),
 * imprime el error y detiene el proceso para evitar errores silenciosos.
 */
pool.connect((err) => {
  if (err) {
    console.error("Error conectando a la BD:", err.message);
    process.exit(1); // Termina el proceso con código de error
  } else {
    console.log("Conectado a PostgreSQL exitosamente");
  }
});

// Exporta el pool para usarse en server.js y cualquier ruta/controlador
module.exports = pool;
