const pool = require("../config/database");

/**
 * GET /api/pagos
 * Retorna todos los pagos registrados, ordenados por fecha descendente.
 */
const getPago = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT idpago AS "idPago", monto, fecha_pago, metodo_pago,
              idinscripcion AS "idInscripcion"
       FROM Pago
       ORDER BY fecha_pago DESC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/pagos
 * Registra un nuevo pago asociado a una inscripción.
 * Body esperado: { monto, fecha_pago, metodo_pago, idInscripcion }
 */
const createPago = async (req, res, next) => {
  try {
    const { monto, fecha_pago, metodo_pago, idInscripcion } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO Pago (monto, fecha_pago, metodo_pago, idInscripcion)
       VALUES ($1,$2,$3,$4)
       RETURNING idpago AS "idPago", monto, fecha_pago, metodo_pago,
                 idinscripcion AS "idInscripcion"`,
      [monto, fecha_pago, metodo_pago, idInscripcion],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {getPago, createPago};