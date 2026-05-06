const pool = require("../config/database");

/**
 * GET /api/areas
 * Retorna todas las áreas del conocimiento disponibles (Matemáticas, Física, etc.),
 * ordenadas alfabéticamente.
 */
const getArea = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Area ORDER BY nombre");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/areas
 * Crea una nueva área del conocimiento.
 * Body esperado: { nombre }
 */
const createArea = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Area (nombre) VALUES ($1) RETURNING *`,
      [nombre],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getArea, createArea };
