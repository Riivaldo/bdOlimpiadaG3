// ─── TAB: INSCRIPCIONES ───────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { G, css } from "../styles/theme";
import { API_URL as API, fetch2 } from "../api/api";
import Field from "../components/Field";

const ITEMS_PER_PAGE = 6;
/**
 * TabInscripcion - Módulo para registrar inscripciones de participantes.
 * Tiene un layout de 3 columnas para el formulario y una tabla debajo.
 *
 * Estados posibles de una inscripción: pendiente | confirmada | anulada
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabInscripcion({ notify }) {
  const [participantes, setParticipantes] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitInscripciones, setLimitInscripciones] = useState(ITEMS_PER_PAGE);

  const [form, setForm] = useState({
    costo: "",
    estado: "pendiente",
    idParticipante: "",
  });

  useEffect(() => {
    Promise.all([
      fetch2(`${API}/participantes`),
      fetch2(`${API}/inscripciones`),
    ]).then(([partData, inscData]) => {
      setParticipantes(partData);
      setInscripciones(inscData);
      setLoading(false);
    });
  }, []);

  // setField es el mismo patrón de currying que handleChange
  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.idParticipante || !form.costo)
      return notify("Completa todos los campos", "err");

    await fetch2(`${API}/inscripciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Inscripción registrada ✓");
    setForm({ costo: "", estado: "pendiente", idParticipante: "" });
    fetch2(`${API}/inscripciones`).then(setInscripciones);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>📋 Inscripción</div>

      {/* Formulario en 3 columnas */}
      <div style={css.grid3}>
        <Field label="Participante">
          <select
            style={css.select}
            value={form.idParticipante}
            onChange={setField("idParticipante")}
          >
            <option value="">Seleccionar...</option>
            {participantes.map((p) => (
              <option
                key={p.idPersona}
                value={p.idPersona}
              >{`${p.nombre} ${p.apePaterno}`}</option>
            ))}
          </select>
        </Field>
        <Field label="Costo (Bs)">
          <input
            type="number"
            style={css.input}
            value={form.costo}
            onChange={setField("costo")}
          />
        </Field>
        {/* Selector de estado con las 3 opciones válidas según la BD */}
        <Field label="Estado">
          <select
            style={css.select}
            value={form.estado}
            onChange={setField("estado")}
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="anulada">Anulada</option>
          </select>
        </Field>
      </div>

      <button style={css.btn()} onClick={submit}>
        Registrar inscripción
      </button>

      {/* Tabla de inscripciones debajo del formulario */}
      <div style={{ marginTop: 28 }}>
        <div style={css.sectionTitle}>Inscripciones</div>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <>
            <table style={css.table}>
              <thead>
                <tr>
                  <th style={css.th}>Participante</th>
                  <th style={css.th}>Costo</th>
                  <th style={css.th}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.slice(0, limitInscripciones).map((i) => (
                  <tr key={i.idInscripcion}>
                    <td style={css.td}>{i.nombreParticipante}</td>
                    <td style={css.td}>{i.costo}</td>
                    {/* Badge con color según el estado */}
                    <td style={css.td}>
                      <span style={css.badge(i.estado)}>{i.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {limitInscripciones < inscripciones.length && (
              <button
                style={css.btnSecondary}
                onClick={() =>
                  setLimitInscripciones((p) =>
                    Math.min(p + ITEMS_PER_PAGE, inscripciones.length),
                  )
                }
              >
                Mostrar más ({limitInscripciones}/{inscripciones.length})
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
