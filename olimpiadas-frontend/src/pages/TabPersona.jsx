
// src/pages/TabPersona.jsx
import { useState, useEffect } from "react";
// Importamos las herramientas que movimos antes
import { API_URL as API, fetch2 } from "../api/api";
import { css } from "../styles/theme";
import Field from "../components/Field";

// Definimos la constante de paginación (estaba en App.jsx)
const ITEMS_PER_PAGE = 5;
// ─── TAB: PERSONAS ────────────────────────────────────────────────────────────

/**
 * TabPersona - Módulo de gestión de Personas.
 * Permite registrar una nueva persona y ver la lista paginada de existentes.
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabPersona({ notify }) {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitPersonas, setLimitPersonas] = useState(ITEMS_PER_PAGE);

  // Estado del formulario con valores iniciales vacíos
  const [form, setForm] = useState({
    ci: "",
    nombre: "",
    apePaterno: "",
    apeMaterno: "",
    fechaNac: "",
    telefono: "",
  });

  // Carga la lista de personas al montar el componente
  useEffect(() => {
    fetch2(`${API}/personas`).then((data) => {
      setPersonas(data);
      setLoading(false);
    });
  }, []);

  // Handler genérico para inputs: actualiza solo el campo indicado por "key"
  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /**
   * submit - Valida y envía el formulario al backend.
   * Campos obligatorios: ci, nombre, apePaterno.
   */
  const submit = async () => {
    if (!form.ci || !form.nombre || !form.apePaterno)
      return notify("Completa los campos obligatorios", "err");

    await fetch2(`${API}/personas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    notify("Persona registrada ✓");
    // Resetea el formulario
    setForm({
      ci: "",
      nombre: "",
      apePaterno: "",
      apeMaterno: "",
      fechaNac: "",
      telefono: "",
    });
    // Recarga la lista
    fetch2(`${API}/personas`).then(setPersonas);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>👤 Personas</div>
      <div style={css.grid2}>
        {/* Columna izquierda: formulario */}
        <div>
          <Field label="Cédula">
            <input
              value={form.ci}
              onChange={handleChange("ci")}
              style={css.input}
            />
          </Field>
          <Field label="Nombre">
            <input
              value={form.nombre}
              onChange={handleChange("nombre")}
              style={css.input}
            />
          </Field>
          <Field label="Apellido paterno">
            <input
              value={form.apePaterno}
              onChange={handleChange("apePaterno")}
              style={css.input}
            />
          </Field>
          <Field label="Apellido materno">
            <input
              value={form.apeMaterno}
              onChange={handleChange("apeMaterno")}
              style={css.input}
            />
          </Field>
          <Field label="Fecha de nacimiento">
            <input
              type="date"
              value={form.fechaNac}
              onChange={handleChange("fechaNac")}
              style={css.input}
            />
          </Field>
          <Field label="Teléfono">
            <input
              value={form.telefono}
              onChange={handleChange("telefono")}
              style={css.input}
            />
          </Field>
          <button style={css.btn()} onClick={submit}>
            Registrar persona
          </button>
        </div>

        {/* Columna derecha: tabla con paginación */}
        <div>
          <div style={css.sectionTitle}>Personas registradas</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              <table style={css.table}>
                <thead>
                  <tr>
                    <th style={css.th}>CI</th>
                    <th style={css.th}>Nombre</th>
                    <th style={css.th}>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Muestra solo hasta limitPersonas filas */}
                  {personas.slice(0, limitPersonas).map((p) => (
                    <tr key={p.idPersona}>
                      <td style={css.td}>{p.ci}</td>
                      <td
                        style={css.td}
                      >{`${p.nombre} ${p.apePaterno} ${p.apeMaterno}`}</td>
                      <td style={css.td}>{p.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Botón "Mostrar más" si hay más registros de los visibles */}
              {limitPersonas < personas.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitPersonas((prev) =>
                      Math.min(prev + ITEMS_PER_PAGE, personas.length),
                    )
                  }
                >
                  Mostrar más ({limitPersonas}/{personas.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}