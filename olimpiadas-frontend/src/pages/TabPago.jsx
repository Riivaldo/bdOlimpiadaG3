// ─── TAB: PAGOS ───────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { G, css } from "../styles/theme";
import Field from "../components/Field";

const ITEMS_PER_PAGE = 6;

/**
 * TabPago - Módulo para registrar pagos asociados a inscripciones.
 * Un participante puede pagar en cuotas (varios pagos por una inscripción).
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabPago({ notify }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitPagos, setLimitPagos] = useState(ITEMS_PER_PAGE);

  const [form, setForm] = useState({
    monto: "",
    fecha_pago: "",
    metodo_pago: "",
    idInscripcion: "",
  });

  useEffect(() => {
    Promise.all([fetch2(`${API}/inscripciones`), fetch2(`${API}/pagos`)]).then(
      ([inscData, pagosData]) => {
        setInscripciones(inscData);
        setPagos(pagosData);
        setLoading(false);
      },
    );
  }, []);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (
      !form.monto ||
      !form.fecha_pago ||
      !form.metodo_pago ||
      !form.idInscripcion
    )
      return notify("Completa todos los campos", "err");

    await fetch2(`${API}/pagos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Pago registrado ✓");
    setForm({ monto: "", fecha_pago: "", metodo_pago: "", idInscripcion: "" });
    fetch2(`${API}/pagos`).then(setPagos);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>💳 Pagos</div>
      <div style={css.grid3}>
        {/* Selector de inscripción: muestra participante y estado */}
        <Field label="Inscripción">
          <select
            style={css.select}
            value={form.idInscripcion}
            onChange={handleChange("idInscripcion")}
          >
            <option value="">Seleccionar...</option>
            {inscripciones.map((i) => (
              <option key={i.idInscripcion} value={i.idInscripcion}>
                {`${i.nombreParticipante} - ${i.estado}`}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monto">
          <input
            type="number"
            style={css.input}
            value={form.monto}
            onChange={handleChange("monto")}
          />
        </Field>
        <Field label="Fecha de pago">
          <input
            type="date"
            style={css.input}
            value={form.fecha_pago}
            onChange={handleChange("fecha_pago")}
          />
        </Field>
        <Field label="Método de pago">
          <input
            value={form.metodo_pago}
            onChange={handleChange("metodo_pago")}
            style={css.input}
          />
        </Field>
      </div>

      <button style={css.btn()} onClick={submit}>
        Registrar pago
      </button>

      <div style={{ marginTop: 28 }}>
        <div style={css.sectionTitle}>Pagos registrados</div>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <>
            <table style={css.table}>
              <thead>
                <tr>
                  <th style={css.th}>Monto</th>
                  <th style={css.th}>Método</th>
                  <th style={css.th}>Inscripción ID</th>
                </tr>
              </thead>
              <tbody>
                {pagos.slice(0, limitPagos).map((p) => (
                  <tr key={p.idPago}>
                    <td style={css.td}>{p.monto}</td>
                    <td style={css.td}>{p.metodo_pago}</td>
                    <td style={css.td}>{p.idInscripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {limitPagos < pagos.length && (
              <button
                style={css.btnSecondary}
                onClick={() =>
                  setLimitPagos((prev) =>
                    Math.min(prev + ITEMS_PER_PAGE, pagos.length),
                  )
                }
              >
                Mostrar más ({limitPagos}/{pagos.length})
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
