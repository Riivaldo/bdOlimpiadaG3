// ─── SISTEMA DE DISEÑO (PALETA DE COLORES) ───────────────────────────────────
/**
 * G - Objeto con los colores del sistema de diseño.
 * Centralizar los colores aquí facilita cambiarlos en un solo lugar.
 */
export const G = {
  bg: "#FAF8F3", // Fondo general de la app
  card: "#F5F3ED", // Fondo de las tarjetas
  border: "#D9D4C8", // Color de bordes
  accent: "#2D5016", // Verde oscuro - color principal
  accent2: "#8B6F47", // Marrón - color secundario
  success: "#3D6B2F", // Verde éxito (inscripción confirmada)
  warn: "#C9854D", // Naranja advertencia (pendiente)
  danger: "#A64D5A", // Rojo peligro (anulada / error)
  text: "#3B3B37", // Color de texto principal
  muted: "#8B8B80", // Color de texto secundario/apagado
};

// ─── ESTILOS INLINE REUTILIZABLES ────────────────────────────────────────────
/**
 * css - Objeto con estilos inline para elementos comunes.
 * Los estilos como funciones (navBtn, btn, badge, toast) aceptan parámetros
 * para variar según el estado o el contexto.
 */
export const css = {
  // Contenedor principal de la aplicación
  app: {
    minHeight: "100vh",
    background: G.bg,
    color: G.text,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: 0,
  },

  // Barra superior con logo y título
  header: {
    background: `linear-gradient(135deg, #F5F3ED 0%, #EAE5D7 100%)`,
    borderBottom: `1px solid ${G.border}`,
    padding: "24px 40px",
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  // Cuadro del logo (emoji trofeo)
  logo: {
    width: 44,
    height: 44,
    background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 900,
    color: G.text,
  },

  title: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" },
  subtitle: { fontSize: 13, color: G.muted, marginTop: 2 },

  // Barra de navegación de pestañas
  nav: {
    display: "flex",
    gap: 4,
    padding: "16px 40px",
    borderBottom: `1px solid ${G.border}`,
    background: G.card,
    overflowX: "auto", // Permite scroll horizontal en pantallas pequeñas
  },

  /**
   * Estilo del botón de pestaña.
   * @param {boolean} active - Si es true, aplica el estilo de pestaña activa
   */
  navBtn: (active) => ({
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    transition: "all 0.2s",
    background: active
      ? `linear-gradient(135deg, ${G.accent}, ${G.accent2})`
      : "transparent",
    color: active ? "#fff" : G.muted,
    whiteSpace: "nowrap",
  }),

  main: { padding: "32px 40px", maxWidth: 960, margin: "0 auto" },

  // Tarjeta contenedora de cada sección
  card: {
    background: G.card,
    border: `1px solid ${G.border}`,
    borderRadius: 16,
    padding: 28,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  // Grillas de 2 y 3 columnas para formularios
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },

  // Contenedor de un campo de formulario (label + input)
  field: { display: "flex", flexDirection: "column", gap: 6 },

  // Etiqueta de campo (uppercase, pequeña)
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: G.muted,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // Estilo base de inputs de texto
  input: {
    background: "#FFFFFF",
    border: `1px solid ${G.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    color: G.text,
    fontSize: 14,
    outline: "none",
    transition: "border 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },

  // Estilo de selects (dropdown)
  select: {
    background: "#FFFFFF",
    border: `1px solid ${G.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    color: G.text,
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },

  /**
   * Botón primario con gradiente.
   * @param {string} color - Color de inicio del gradiente (por defecto verde)
   */
  btn: (color = G.accent) => ({
    background: `linear-gradient(135deg, ${color})`,
    border: "none",
    borderRadius: 10,
    padding: "12px 28px",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
    transition: "opacity 0.2s",
  }),

  // Botón secundario (borde, sin relleno)
  btnSecondary: {
    background: "transparent",
    border: `1px solid ${G.border}`,
    borderRadius: 10,
    padding: "10px 20px",
    color: G.muted,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    marginTop: 8,
  },

  /**
   * Notificación toast flotante.
   * @param {string} type - "ok" para éxito (verde), cualquier otro para error (rojo)
   */
  toast: (type) => ({
    position: "fixed",
    top: 20,
    right: 20,
    background: type === "ok" ? G.success : G.danger,
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    zIndex: 9999,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  }),

  // Estilos de tabla
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    borderBottom: `1px solid ${G.border}`,
    color: G.muted,
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "10px 14px",
    borderBottom: `1px solid ${G.border}`,
    color: G.text,
  },

  /**
   * Badge de estado de inscripción con color según el estado.
   * @param {string} estado - "confirmada" | "anulada" | "pendiente"
   */
  badge: (estado) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    background:
      estado === "confirmada"
        ? "#10b98133"
        : estado === "anulada"
          ? "#ef444433"
          : "#f59e0b33",
    color:
      estado === "confirmada"
        ? G.success
        : estado === "anulada"
          ? G.danger
          : G.warn,
  }),
};
