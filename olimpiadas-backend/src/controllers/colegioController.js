const pool = require("../config/database");

/**
 * GET /api/colegios
 * Retorna la lista completa de colegios junto con los datos de su tutor asignado.
 * Usa un LEFT JOIN para incluir colegios sin tutor.
 */

const getColegios = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.idcolegio AS "idColegio", c.nombre, c.direccion, c.municipio,
              c.nroaprobados AS "nroAprobados", c.nroreprobados AS "nroReprobados",
              c.tipo, c.idtutor AS "idTutor",
              p.nombre AS "nombreTutor", p.apepaterno AS "apePaterno"
       FROM Colegio c
       LEFT JOIN Persona p ON c.idTutor = p.idPersona
       ORDER BY c.nombre`,
    );
    res.json(rows); // Responde con el arreglo de colegios en formato JSON
  } catch (error) {
    next(error); // Delega el error al middleware errorHandler
  }
};

/**
 * POST /api/colegios
 * Crea un nuevo colegio en la base de datos.
 * Body esperado: { nombre, direccion, municipio, tipo, idTutor }
 * Los contadores nroAprobados y nroReprobados inician en 0.
 */
const createColegio = async (req, res, next) => {
  try {
    const { nombre, direccion, municipio, tipo, idTutor } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Colegio (nombre, direccion, municipio, nroAprobados, nroReprobados, tipo, idTutor)
       VALUES ($1,$2,$3,0,0,$4,$5)
       RETURNING idcolegio AS "idColegio", nombre, direccion, municipio, 
                 nroaprobados AS "nroAprobados", nroreprobados AS "nroReprobados",
                 tipo, idtutor AS "idTutor"`,
      [nombre, direccion, municipio, tipo, idTutor],
    );
    res.status(201).json(rows[0]); // 201 Created + el colegio recién insertado
  } catch (error) {
    next(error);
  }
};

module.exports = { getColegios, createColegio };
