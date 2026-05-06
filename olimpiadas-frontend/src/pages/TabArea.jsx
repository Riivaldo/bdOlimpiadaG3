import { useState, useEffect } from "react";
import { API_URL as API, fetch2 } from "../api/api";
import { G, css } from "../styles/theme";
import Field from "../components/Field";

// ─── TAB: ÁREAS ───────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 6;
/**
 * TabArea - Módulo para gestionar las áreas del conocimiento (Matemáticas, Física…).
 * Es el módulo más simple: solo tiene un campo "nombre".
 *
 * @param {Function} notify - Función para mostrar notificaciones toast
 */
export default function TabArea({ notify }) {
  const [areas, setAreas] = useState([]);
  const [nombre, setNombre] = useState(""); // Estado del único campo del formulario
  const [loading, setLoading] = useState(true);
  const [limitAreas, setLimitAreas] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    fetch2(`${API}/areas`).then((data) => {
      setAreas(data);
      setLoading(false);
    });
  }, []);

  const submit = async () => {
    if (!nombre) return notify("Escribe el nombre del área", "err");

    await fetch2(`${API}/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });

    notify("Área registrada ✓");
    setNombre(""); // Limpia el campo
    fetch2(`${API}/areas`).then(setAreas);
  };

  return (
    <div style={css.card}>
      <div style={css.sectionTitle}>📚 Áreas</div>
      <div style={css.grid2}>
        <div>
          <Field label="Nombre">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={css.input}
            />
          </Field>
          <button style={css.btn()} onClick={submit}>
            Registrar área
          </button>
        </div>
        <div>
          <div style={css.sectionTitle}>Áreas registradas</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <>
              {/* Las áreas se muestran como lista de tarjetas en vez de tabla */}
              <ul style={{ padding: 0, listStyle: "none" }}>
                {areas.slice(0, limitAreas).map((a) => (
                  <li
                    key={a.idArea}
                    style={{
                      marginBottom: 10,
                      padding: 12,
                      borderRadius: 12,
                      background: G.card,
                      border: `1px solid ${G.border}`,
                    }}
                  >
                    {a.nombre}
                  </li>
                ))}
              </ul>
              {limitAreas < areas.length && (
                <button
                  style={css.btnSecondary}
                  onClick={() =>
                    setLimitAreas((p) =>
                      Math.min(p + ITEMS_PER_PAGE, areas.length),
                    )
                  }
                >
                  Mostrar más ({limitAreas}/{areas.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
