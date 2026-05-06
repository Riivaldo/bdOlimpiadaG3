const pool = require("../config/database");

const getPersonas = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT idpersona AS "idPersona", ci, nombre,
              apepaterno AS "apePaterno", apematerno AS "apeMaterno",
              fechanac AS "fechaNac", telefono
       FROM Persona ORDER BY apepaterno`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Mueves la función de crear persona
const createPersona = async (req, res, next) => {
  try {
    const { ci, nombre, apePaterno, apeMaterno, fechaNac, telefono } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Persona (ci, nombre, apePaterno, apeMaterno, fechaNac, telefono)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING idpersona AS "idPersona", ci, nombre,
                 apepaterno AS "apePaterno", apematerno AS "apeMaterno",
                 fechanac AS "fechaNac", telefono`,
      [ci, nombre, apePaterno, apeMaterno, fechaNac, telefono],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getPersonas, createPersona };
