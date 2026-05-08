import { useState } from "react";
import { css } from "../styles/theme"; // Importamos tus estilos globales

export default function TabProceso() {
  const [anio, setAnio] = useState("");
  const [resultado, setResultado] = useState(null);

  const enviarDatos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/consultar-olimpiada",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ anioInput: anio }),
        },
      );
      const data = await response.json();
      if (data.success) setResultado(data.p_total);// cambiar data.por variable de salida del procediemiento
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
          style={css.input} // Aplicamos el estilo de tus otros inputs
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          placeholder="Ej. 2024"
        />
        <button
          style={css.btn()} // Aplicamos el estilo de tus botones
          onClick={enviarDatos}
        >
          Consultar Base de Datos
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
          <span style={{ fontSize: "1.2rem" }}>
            Total Estudiantes: <strong>{resultado}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
