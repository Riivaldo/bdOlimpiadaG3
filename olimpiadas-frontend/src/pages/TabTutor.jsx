import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";

import { css } from "../styles/theme";
import Field from "../components/Field";

const ITEMS_PER_PAGE = 5;

// ─── TAB: TUTORES ─────────────────────────────────────────────────────────────

/**
 * TabTutor - Módulo para asignar el rol de Tutor a una Persona existente.
 * Carga la lista de personas para el selector y la lista de tutores para la tabla.
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabTutor({ notify }) {
  const [tutores, setTutores] = useState([]);
  const [personas, setPersonas] = useState([]); // Para el <select>
  const [loading, setLoading] = useState(true);
  const [limitTutores, setLimitTutores] = useState(ITEMS_PER_PAGE);
  const [form, setForm] = useState({ idPersona: "", especialidad: "" });

  // Carga tutores y personas en paralelo con Promise.all para optimizar
  useEffect(() => {
    Promise.all([fetch2(`${API}/tutores`), fetch2(`${API}/personas`)]).then(
      ([tutoresData, personasData]) => {
        setTutores(tutoresData);
        setPersonas(personasData);
        setLoading(false);
      },
    );
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.idPersona || !form.especialidad)
      return notify("Completa los campos", "err");

    await fetch2(`${API}/tutores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Tutor registrado ✓");
    setForm({ idPersona: "", especialidad: "" });
    fetch2(`${API}/tutores`).then(setTutores);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>🧑‍🏫 Tutores</div>
      <div style={css.grid2}>
        <div>
          {/* Selector de persona: muestra nombre + apellido de cada opción */}
          <Field label="Persona">
            <select
              style={css.select}
              value={form.idPersona}
              onChange={handleChange("idPersona")}
            >
              <option value="">Seleccionar...</option>
              {personas.map((p) => (
                <option key={p.idPersona} value={p.idPersona}>
                  {p.nombre} {p.apePaterno}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Especialidad">
            <input
              value={form.especialidad}
              onChange={handleChange("especialidad")}
              style={css.input}
            />
          </Field>
          <button style={css.btn()} onClick={submit}>
            Registrar tutor
          </button>
        </div>

        <div>
          <div style={css.sectionTitle}>Tutores registrados</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>Persona</th>
                    <th style={css.th}>Especialidad</th>
                  </tr>
                </thead>
                <tbody>
                  {tutores.slice(0, limitTutores).map((t) => (
                    <tr key={t.idPersona}>
                      <td style={css.td}>{`${t.nombre} ${t.apePaterno}`}</td>
                      <td style={css.td}>{t.especialidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {limitTutores < tutores.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitTutores((prev) =>
                      Math.min(prev + ITEMS_PER_PAGE, tutores.length),
                    )
                  }
                >
                  Mostrar más ({limitTutores}/{tutores.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
