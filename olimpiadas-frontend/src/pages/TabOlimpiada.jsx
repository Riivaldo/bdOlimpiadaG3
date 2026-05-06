// ─── TAB: OLIMPIADAS ──────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { css } from "../styles/theme";
import Field from "../components/Field";

const ITEMS_PER_PAGE = 5;
/**
 * TabOlimpiada - Módulo para registrar olimpiadas con nombre, gestión y fechas.
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabOlimpiada({ notify }) {
  const [olimpiadas, setOlimpiadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitOlimpiadas, setLimitOlimpiadas] = useState(ITEMS_PER_PAGE);
  const [form, setForm] = useState({
    nombre: "",
    gestion: "",
    version: "",
    fecha_Ini: "",
    fecha_fin: "",
  });

  useEffect(() => {
    fetch2(`${API}/olimpiadas`).then((data) => {
      setOlimpiadas(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.nombre || !form.gestion)
      return notify("Completa los campos obligatorios", "err");

    await fetch2(`${API}/olimpiadas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Olimpiada registrada ✓");
    setForm({
      nombre: "",
      gestion: "",
      version: "",
      fecha_Ini: "",
      fecha_fin: "",
    });
    fetch2(`${API}/olimpiadas`).then(setOlimpiadas);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>🏆 Olimpiadas</div>
      <div style={css.grid2}>
        <div>
          <Field label="Nombre">
            <input
              value={form.nombre}
              onChange={handleChange("nombre")}
              style={css.input}
            />
          </Field>
          <Field label="Gestión">
            <input
              value={form.gestion}
              onChange={handleChange("gestion")}
              style={css.input}
            />
          </Field>
          <Field label="Versión">
            <input
              value={form.version}
              onChange={handleChange("version")}
              style={css.input}
            />
          </Field>
          <Field label="Fecha inicio">
            <input
              type="date"
              value={form.fecha_Ini}
              onChange={handleChange("fecha_Ini")}
              style={css.input}
            />
          </Field>
          <Field label="Fecha fin">
            <input
              type="date"
              value={form.fecha_fin}
              onChange={handleChange("fecha_fin")}
              style={css.input}
            />
          </Field>
          <button style={css.btn()} onClick={submit}>
            Registrar olimpiada
          </button>
        </div>
        <div>
          <div style={css.sectionTitle}>Olimpiadas registradas</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>Nombre</th>
                    <th style={css.th}>Gestión</th>
                    <th style={css.th}>Fechas</th>
                  </tr>
                </thead>
                <tbody>
                  {olimpiadas.slice(0, limitOlimpiadas).map((o) => (
                    <tr key={o.idOlimpiada}>
                      <td style={css.td}>{o.nombre}</td>
                      <td style={css.td}>{o.gestion}</td>
                      <td
                        style={css.td}
                      >{`${o.fecha_Ini || ""} → ${o.fecha_fin || ""}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {limitOlimpiadas < olimpiadas.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitOlimpiadas((p) =>
                      Math.min(p + ITEMS_PER_PAGE, olimpiadas.length),
                    )
                  }
                >
                  Mostrar más ({limitOlimpiadas}/{olimpiadas.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
