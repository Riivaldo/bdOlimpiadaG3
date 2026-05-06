import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { G, css } from "../styles/theme";
import Field from "../components/Field";

const ITEMS_PER_PAGE = 5;

// ─── TAB: RESULTADOS ──────────────────────────────────────────────────────────

/**
 * TabResultado - Módulo para registrar los puntajes obtenidos por los participantes.
 * La tabla de resultados muestra un ranking de mayor a menor puntaje.
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabResultado({ notify }) {
  const [resultados, setResultados] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);

  const [form, setForm] = useState({ puntaje_Obtenido: "", idInscripcion: "" });

  useEffect(() => {
    Promise.all([
      fetch2(`${API}/resultados`),
      fetch2(`${API}/inscripciones`),
    ]).then(([resultadosData, inscripcionesData]) => {
      setResultados(resultadosData);
      setInscripciones(inscripcionesData);
      setLoading(false);
    });
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.puntaje_Obtenido || !form.idInscripcion)
      return notify("Completa todos los campos", "err");

    await fetch2(`${API}/resultados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Resultado registrado ✓");
    setForm({ puntaje_Obtenido: "", idInscripcion: "" });
    fetch2(`${API}/resultados`).then(setResultados);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>📊 Resultados (Ranking)</div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <table style={css.table}>
            <thead>
              <tr>
                <th style={css.th}>Participante</th>
                <th style={css.th}>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {/* 3. Usamos slice para mostrar solo desde el 0 hasta el límite */}
              {resultados.slice(0, limit).map((r) => (
                <tr key={r.idResultado}>
                  <td style={css.td}>{`${r.nombre} ${r.apePaterno}`}</td>
                  <td style={css.td}>{r.puntaje_Obtenido}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 4. El botón de "Mostrar más" */}
          {limit < resultados.length && (
            <button
              style={css.btnSecondary}
              onClick={() => setLimit((prev) => prev + ITEMS_PER_PAGE)}
            >
              Mostrar más ({limit} de {resultados.length})
            </button>
          )}
        </>
      )}
    </div>
  );
}
