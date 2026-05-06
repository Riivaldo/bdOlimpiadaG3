import { css } from "../styles/theme";
/**
 * Toast - Notificación flotante que se cierra automáticamente después de 3 segundos.
 *
 * @param {string}   msg     - Mensaje a mostrar
 * @param {string}   type    - Tipo: "ok" (verde) o cualquier otro (rojo)
 * @param {Function} onClose - Callback que se llama al cerrar el toast
 */
// 2. Definimos la pieza (componente)
// Recibe "msg", que es un objeto como { text: "Guardado", type: "success" }
export default function Toast({ msg }) {
  // Si el jefe no mandó texto, no mostramos nada
  if (!msg || !msg.text) return null;
    return (
    <div style={css.toast(msg.type)}>
      {msg.text}
    </div>
  );
}

