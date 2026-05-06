/**
 * @file src/App.jsx
 * @description Componente raíz que maneja la aplicación:
    se dividio en pages para darle escalabilidad
 *      1.styles/theme.js El sistema de diseño (paleta de colores y estilos reutilizables)
 *   2. components/: Componentes auxiliares (Toast, Field)
 *   3. Las 9 pestañas estan en pages como TabNombredelModulo/ módulos del sistema  (Inscripción, Persona, Participante,Tutor, Colegio, Olimpiada, Área, Pago, Resultado)
 *   4. La función principal App que maneja la navegación por pestañas
 *
 * Patrón de estado por pestaña:
 *   - Cada Tab tiene su propio estado local (lista + formulario + loading + paginación)
 *   - Al montar, hace fetch a la API para llenar la lista
 *   - Al enviar el formulario, hace POST y refresca la lista
 */

import { useState, useEffect } from "react";
// css importacion
import { G, css } from "./styles/theme";
//import API  URL base de la API del backend
import { API_URL as API, fetch2 } from "./api/api";
// toast
import Toast from "./components/Toast";
// field
import Field from "./components/Field";
// PERSONA
import TabPersona from "./pages/TabPersona";
// TUTOR
import TabTutor from "./pages/TabTutor";
//PARTICIPANTE
import TabParticipante from "./pages/TabParticipante";
// Colegio
import TabColegio from "./pages/TabColegio";
// OLIMPIADA
import TabOlimpiada from "./pages/TabOlimpiada";
// AREA
import TabArea from "./pages/TabArea";
// Inscripcion
import TabInscripcion from "./pages/TabInscripcion";
// PAGO
import TabPago from "./pages/TabPago";
// RESULTADO
import TabResultado from "./pages/TabResultado";

/**
 * TABS - Define las pestañas de navegación del sistema.
 * Cada pestaña tiene un id único y un label visible con emoji.
 */
const TABS = [
  { id: "inscripcion", label: "📋 Inscripción" },
  { id: "persona", label: "👤 Persona" },
  { id: "participante", label: "🎓 Participante" },
  { id: "tutor", label: "🧑‍🏫 Tutor" },
  { id: "colegio", label: "🏫 Colegio" },
  { id: "olimpiada", label: "🏆 Olimpiada" },
  { id: "area", label: "📚 Área" },
  { id: "pago", label: "💳 Pago" },
  { id: "resultado", label: "📊 Resultado" },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

/**
 * App - Componente raíz. Maneja la pestaña activa y las notificaciones toast.
 * Renderiza el Tab correspondiente a la pestaña seleccionada.
 */
export default function App() {
  const [tab, setTab] = useState("inscripcion"); // Pestaña activa (id)
  const [toast, setToast] = useState(null); // Notificación actual (null = sin notificación)

  /**
   * notify - Muestra una notificación toast temporal.
   * @param {string} msg  - Mensaje a mostrar
   * @param {string} type - "ok" (verde) o "err" (rojo)
   */
  const notify = (msg, type = "ok") => setToast({ msg, type });

  return (
    <div style={css.app}>
      {/* Toast: solo se renderiza si hay una notificación activa */}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── Cabecera ──────────────────────────────────────────────────────── */}
      <div style={css.header}>
        <div style={css.logo}>🏆</div>
        <div>
          <div style={css.title}>Olimpiadas Científicas</div>
          <div style={css.subtitle}>Sistema de Gestión y Registro</div>
        </div>
      </div>

      {/* ── Barra de navegación de pestañas ───────────────────────────────── */}
      <div style={css.nav}>
        {TABS.map((t) => (
          <button
            key={t.id}
            style={css.navBtn(tab === t.id)} // Activo si coincide con la pestaña actual
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Contenido de la pestaña activa ────────────────────────────────── */}
      <div style={css.main}>
        {tab === "inscripcion" && <TabInscripcion notify={notify} />}
        {tab === "persona" && <TabPersona notify={notify} />}
        {tab === "participante" && <TabParticipante notify={notify} />}
        {tab === "tutor" && <TabTutor notify={notify} />}
        {tab === "colegio" && <TabColegio notify={notify} />}
        {tab === "olimpiada" && <TabOlimpiada notify={notify} />}
        {tab === "area" && <TabArea notify={notify} />}
        {tab === "pago" && <TabPago notify={notify} />}
        {tab === "resultado" && <TabResultado notify={notify} />}
      </div>
    </div>
  );
}
