import { useState } from "react";
import { css } from "../styles/theme"; 

export default function TabProceso() {
  const [anio, setAnio] = useState(""); // DATO DE ENTRADA
  const [resultado, setResultado] = useState(null); // DATO DE SALIDA 

  const enviarDatos = async () => {
    try {
      // Esta función envía el año al backend, que llama a la función/procedimiento SQL.
      // Si cambias a procedimiento, el backend se encarga; aquí solo envía los datos necesarios.
      // Para agregar más campos: Incluye otroDato en el body: { anioInput: anio, otroParam: otroDato }
      const response = await fetch(
        "http://localhost:3001/api/consultar-olimpiada",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ anioInput: anio }), // Agrega más propiedades si el proc lo requiere, usar la misma var para tabproceso y procesoController 
        },
      );
      const data = await response.json();
      if (data.success) setResultado(data.p_total); // Recibe p_total del backend es el alias de la funcion y se asigna la respuesta al const DATA
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div style={css.card}>
      {" "}
      {/* Usamos el estilo de tarjeta de tu proyecto */}
      <h2 style={css.sectionTitle}>📊 Consulta de Participantes</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Introduce el año para obtener el total de estudiantes registrados.
      </p>
      <div style={{ maxWidth: "300px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Año de Olimpiada:
        </label>
        <input
          type="number"
          style={css.input} // Aplicamos el estilo
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          placeholder="Ej. 2024"
        />
        {/* Si necesitas más inputs, agrégalos aquí. Por ejemplo:
        <label> Otro dato: </label>
        <input value={otroDato} onChange={(e) => setOtroDato(e.target.value)} />
        */}
        <button
          style={css.btn()} // Aplicamos el CSS a eleccion 
          onClick={enviarDatos}
        >
          Ejecutar
          {/* Consultar Base de Datos */}
        </button>
      </div>
      {resultado !== null && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
          }}
        >
          {/* editar para la salida esperada */}
          <span style={{ fontSize: "1.2rem" }}>
            Total Estudiantes: <strong>{resultado}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
