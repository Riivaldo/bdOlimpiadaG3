import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { css } from "../styles/theme";
import Field from "../components/Field";

// ─── TAB: PARTICIPANTES ───────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 7;
/**
 * TabParticipante - Módulo para registrar Participantes en las olimpiadas.
 * Carga personas, colegios y tutores para los selectores del formulario.
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabParticipante({ notify }) {
  const [participantes, setParticipantes] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [colegios, setColegios] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitParticipantes, setLimitParticipantes] = useState(ITEMS_PER_PAGE);

  const [form, setForm] = useState({
    idPersona: "",
    grado_Escolar: "",
    idColegio: "",
    idTutor_Encargado: "",
  });

  // Carga los 4 recursos en paralelo
  useEffect(() => {
    Promise.all([
      fetch2(`${API}/participantes`),
      fetch2(`${API}/personas`),
      fetch2(`${API}/colegios`),
      fetch2(`${API}/tutores`),
    ]).then(([participantesData, personasData, colegiosData, tutoresData]) => {
      setParticipantes(participantesData);
      setPersonas(personasData);
      setColegios(colegiosData);
      setTutores(tutoresData);
      setLoading(false);
    });
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.idPersona || !form.grado_Escolar)
      return notify("Completa los campos obligatorios", "err");

    await fetch2(`${API}/participantes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Participante registrado ✓");
    setForm({
      idPersona: "",
      grado_Escolar: "",
      idColegio: "",
      idTutor_Encargado: "",
    });
    fetch2(`${API}/participantes`).then(setParticipantes);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>🎓 Participantes</div>
      <div style={css.grid2}>
        <div>
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
          <Field label="Grado escolar">
            <input
              value={form.grado_Escolar}
              onChange={handleChange("grado_Escolar")}
              style={css.input}
            />
          </Field>
          <Field label="Colegio">
            <select
              style={css.select}
              value={form.idColegio}
              onChange={handleChange("idColegio")}
            >
              <option value="">Seleccionar...</option>
              {colegios.map((c) => (
                <option key={c.idColegio} value={c.idColegio}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tutor encargado">
            <select
              style={css.select}
              value={form.idTutor_Encargado}
              onChange={handleChange("idTutor_Encargado")}
            >
              <option value="">Seleccionar...</option>
              {tutores.map((t) => (
                <option key={t.idPersona} value={t.idPersona}>
                  {t.nombre} {t.apePaterno}
                </option>
              ))}
            </select>
          </Field>
          <button style={css.btn()} onClick={submit}>
            Registrar participante
          </button>
        </div>

        <div>
          <div style={css.sectionTitle}>Participantes registrados</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>Nombre</th>
                    <th style={css.th}>Grado</th>
                    <th style={css.th}>Colegio</th>
                  </tr>
                </thead>
                <tbody>
                  {participantes.slice(0, limitParticipantes).map((p) => (
                    <tr key={p.idPersona}>
                      <td style={css.td}>{`${p.nombre} ${p.apePaterno}`}</td>
                      <td style={css.td}>{p.grado_Escolar}</td>
                      <td style={css.td}>{p.nombreColegio || "Sin colegio"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {limitParticipantes < participantes.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitParticipantes((prev) =>
                      Math.min(prev + ITEMS_PER_PAGE, participantes.length),
                    )
                  }
                >
                  Mostrar más ({limitParticipantes}/{participantes.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
