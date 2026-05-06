import { css } from "../styles/theme";
/**
 * Field - Envuelve un input con su etiqueta de forma consistente.
 *
 * @param {string}    label    - Texto de la etiqueta
 * @param {ReactNode} children - El input o select que va dentro del campo
 */
export default function Field({ label, children }) {
  return (
    <div style={css.field}>
      <label style={css.label}>{label}</label>
      {children}
    </div>
  );
}
