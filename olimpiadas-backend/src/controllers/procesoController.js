const pool = require("../config/database"); // Asegúrate que esta ruta sea la correcta

// nombre de la const para la funcion
const ejecutarFuncionOlimpiada = async (req, res) => {
  // 1. Extraer el dato del cuerpo (el año)
  // extraer el 2 dato si asi lo pide la ejercicio
  const { anioInput } = req.body;

  // Imprime en tu terminal para ver si llega el dato  // degub para ver si manda el dato a la BD
  console.log("año de ingreso :", anioInput);

  try {
    // 2. Consulta SQL (Función que devuelve un entero)
    // para un prpcedimiento agregar un $extra ya q ocupa esa variable de salida
    //const query = "call partxolimpiadap($1,$2)";
    const query = "select partixolimpiada($1) as p_total";
    const valores = [anioInput];

    //pasamos los valores, la consulta y el o los datos
    const result = await pool.query(query, valores);

    // 3. Capturar el número
    const cantidadEstudiantes = result.rows[0].p_total; //.total es el alias para el resultado la consulta

    // 4. Enviar respuesta JSON estructurada
    res.status(200).json({
      success: true,
      p_total: cantidadEstudiantes, // variable con el nombre de salida el el procedimientp
      // ejemplo el alias o el nombre de salida del procedimiento
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
