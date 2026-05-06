const pool = require("../config/database");

/**
 * GET /api/inscripciones
 * Retorna todas las inscripciones con el nombre del participante asociado.
 * Ordena por ID de inscripción descendente (más recientes primero).
 */
const getInscripcion = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT i.idinscripcion AS "idInscripcion", i.costo, i.estado,
              i.idparticipante AS "idParticipante",
              p.nombre AS "nombreParticipante",
              p.apepaterno AS "apePaterno"
       FROM Inscripcion i
       JOIN Participante pa ON i.idParticipante = pa.idPersona
       JOIN Persona p ON pa.idPersona = p.idPersona
       ORDER BY i.idInscripcion DESC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/inscripciones
 * Registra una nueva inscripción para un participante.
 * El estado por defecto es "pendiente" si no se especifica otro.
 * Body esperado: { costo, estado, idParticipante }
 */
const createInscripcion = async (req, res, next) => {
  try {
    const { costo, estado, idParticipante } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Inscripcion (costo, estado, idParticipante)
       VALUES ($1,$2,$3) RETURNING *`,
      [costo, estado || "pendiente", idParticipante], // valor por defecto: "pendiente"
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
module.exports = {getInscripcion, createInscripcion};