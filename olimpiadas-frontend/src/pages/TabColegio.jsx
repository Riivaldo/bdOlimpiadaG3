// ─── TAB: COLEGIOS ────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { css } from "../styles/theme";
import Field from "../components/Field";
const ITEMS_PER_PAGE = 5;
/**
 * TabColegio - Módulo de gestión de Colegios dentro de la app de pestañas.
 * Similar a la página Colegios.jsx pero integrado en el sistema de tabs.
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabColegio({ notify }) {
  const [colegios, setColegios] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitColegios, setLimitColegios] = useState(ITEMS_PER_PAGE);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    municipio: "",
    tipo: "",
    idTutor: "",
  });

  useEffect(() => {
    Promise.all([fetch2(`${API}/colegios`), fetch2(`${API}/tutores`)]).then(
      ([colegiosData, tutoresData]) => {
        setColegios(colegiosData);
        setTutores(tutoresData);
        setLoading(false);
      },
    );
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.nombre || !form.direccion || !form.municipio || !form.tipo)
      return notify("Completa los campos", "err");

    await fetch2(`${API}/colegios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Colegio registrado ✓");
    setForm({
      nombre: "",
      direccion: "",
      municipio: "",
      tipo: "",
      idTutor: "",
    });
    fetch2(`${API}/colegios`).then(setColegios);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>🏫 Colegios</div>
      <div style={css.grid2}>
        <div>
          <Field label="Nombre">
            <input
              value={form.nombre}
              onChange={handleChange("nombre")}
              style={css.input}
            />
          </Field>
          <Field label="Dirección">
            <input
              value={form.direccion}
              onChange={handleChange("direccion")}
              style={css.input}
            />
          </Field>
          <Field label="Municipio">
            <input
              value={form.municipio}
              onChange={handleChange("municipio")}
              style={css.input}
            />
          </Field>
          <Field label="Tipo">
            <input
              value={form.tipo}
              onChange={handleChange("tipo")}
              style={css.input}
            />
          </Field>
          {/* Selector de tutor responsable del colegio */}
          <Field label="Tutor (ID)">
            <select
              style={css.select}
              value={form.idTutor}
              onChange={handleChange("idTutor")}
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
            Registrar colegio
          </button>
        </div>

        <div>
          <div style={css.sectionTitle}>Colegios registrados</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>Nombre</th>
                    <th style={css.th}>Tipo</th>
                    <th style={css.th}>Tutor</th>
                  </tr>
                </thead>
                <tbody>
                  {colegios.slice(0, limitColegios).map((c) => (
                    <tr key={c.idColegio}>
                      <td style={css.td}>{c.nombre}</td>
                      <td style={css.td}>{c.tipo}</td>
                      <td style={css.td}>{c.nombreTutor || "Sin tutor"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {limitColegios < colegios.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitColegios((prev) =>
                      Math.min(prev + ITEMS_PER_PAGE, colegios.length),
                    )
                  }
                >
                  Mostrar más ({limitColegios}/{colegios.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
