const pool = require("../config/database");
/**
 * GET /api/olimpiadas
 * Retorna todas las olimpiadas registradas, ordenadas por gestión descendente
 * (la más reciente primero).
 */
const getOlimpiada = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM Olimpiada ORDER BY gestion DESC",
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/olimpiadas
 * Crea una nueva olimpiada.
 * Body esperado: { nombre, gestion, version, fecha_Ini, fecha_fin }
 */
const createOlimpiada = async (req, res, next) => {
  try {
    const { nombre, gestion, version, fecha_Ini, fecha_fin } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Olimpiada (nombre, gestion, version, fecha_Ini, fecha_fin)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [nombre, gestion, version, fecha_Ini, fecha_fin],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {getOlimpiada, createOlimpiada};
