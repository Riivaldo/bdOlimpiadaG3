const pool = require("../config/database");

/**
 * GET /api/participantes
 * Retorna todos los participantes con sus datos personales, grado escolar,
 * colegio y tutor encargado. Usa múltiples JOINs para obtener nombres.
 */
const getParticipante = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.idpersona AS "idPersona", p.ci, p.nombre,
              p.apepaterno AS "apePaterno", p.apematerno AS "apeMaterno",
              p.fechanac AS "fechaNac", p.telefono,
              pa.grado_escolar AS "grado_Escolar",
              pa.idcolegio AS "idColegio",
              pa.idtutor_encargado AS "idTutor_Encargado",
              c.nombre AS "nombreColegio"
       FROM Persona p
       JOIN Participante pa ON p.idPersona = pa.idPersona
       LEFT JOIN Colegio c ON pa.idColegio = c.idColegio
       ORDER BY p.apepaterno`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/participantes
 * Registra a una Persona existente como Participante en una olimpiada.
 * Body esperado: { idPersona, grado_Escolar, idColegio, idTutor_Encargado }
 */
const createParticipante = async (req, res, next) => {
  try {
    const { idPersona, grado_Escolar, idColegio, idTutor_Encargado } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Participante (idPersona, grado_Escolar, idColegio, idTutor_Encargado)
       VALUES ($1,$2,$3,$4)
       RETURNING idparticipante AS "idParticipante",
                 idpersona AS "idPersona",
                 grado_escolar AS "grado_Escolar",
                 idcolegio AS "idColegio",
                 idtutor_encargado AS "idTutor_Encargado"`,
      [idPersona, grado_Escolar, idColegio, idTutor_Encargado],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {getParticipante, createParticipante};
