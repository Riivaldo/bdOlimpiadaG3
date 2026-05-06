const pool = require("../config/database");

/**
 * GET /api/resultados
 * Retorna todos los resultados con el nombre del participante.
 * Ordena de mayor a menor puntaje (ranking).
 */
const getResultado = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.idresultado AS "idResultado",
              r.puntaje_obtenido AS "puntaje_Obtenido",
              r.idinscripcion AS "idInscripcion",
              p.nombre,
              p.apepaterno AS "apePaterno"
       FROM Resultado r
       JOIN Inscripcion i ON r.idInscripcion = i.idInscripcion
       JOIN Participante pa ON i.idParticipante = pa.idPersona
       JOIN Persona p ON pa.idPersona = p.idPersona
       ORDER BY r.puntaje_obtenido DESC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/resultados
 * Registra el puntaje obtenido por un participante en su inscripción.
 * Body esperado: { puntaje_Obtenido, idInscripcion }
 */
const createResultado = async (req, res, next) => {
  try {
    const { puntaje_Obtenido, idInscripcion } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Resultado (puntaje_Obtenido, idInscripcion)
       VALUES ($1,$2)
       RETURNING idresultado AS "idResultado",
                 puntaje_obtenido AS "puntaje_Obtenido",
                 idinscripcion AS "idInscripcion"`,
      [puntaje_Obtenido, idInscripcion],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {getResultado, createResultado};