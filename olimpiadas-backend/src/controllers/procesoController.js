const pool = require("../config/database"); // ruta para la conexion a la BD

// funcion para el bttn
const ejecutarFuncionOlimpiada = async (req, res) => {
  // Extraer el dato del front
  const { anioInput } = req.body;

  // Debug: Imprimir en terminal para verificar que llega el dato
  //console.log("Año de ingreso:", anioInput);

  try {
    // consulta y valores
    const query = "SELECT partixolimpiada($1) AS p_total";
    const valores = [anioInput];

    // Guardat la consulata en la variable enviando
    // la consulta y valores
    const result = await pool.query(query, valores);

    // 3. Capturar el resultado
    const cantidadEstudiantes = result.rows[0].p_total;

    // Enviar respuesta JSON
    res.status(200).json({
      success: true,
      p_total: cantidadEstudiantes,
    });
  } catch (error) {
    console.error("Error en DB:", error.message);
    res.status(500).json({
      success: false,
      error: "Error en la consulta de base de datos",
    });
  }
};

module.exports = { ejecutarFuncionOlimpiada };
