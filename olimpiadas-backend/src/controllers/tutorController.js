const pool = require("../config/database");

/**
 * GET /api/tutores
 * Retorna todos los tutores con sus datos personales y especialidad.
 * Hace JOIN entre Persona y Tutor usando idPersona como clave compartida.
 */
const getTutores = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.idpersona AS "idPersona", p.ci, p.nombre,
              p.apepaterno AS "apePaterno", p.apematerno AS "apeMaterno",
              p.fechanac AS "fechaNac", p.telefono,
              t.especialidad
       FROM Persona p
       JOIN Tutor t ON p.idPersona = t.idPersona
       ORDER BY p.apepaterno`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/tutores
 * Vincula a una Persona existente como Tutor con una especialidad.
 * Requiere que la persona ya exista en la tabla Persona.
 * Body esperado: { idPersona, especialidad }
 */
const createTutores = async (req, res, next) => {
  try {
    const { idPersona, especialidad } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Tutor (idPersona, especialidad) VALUES ($1,$2) RETURNING *`,
      [idPersona, especialidad],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTutores, createTutores };
