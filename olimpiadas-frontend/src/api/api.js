export const API = "http://localhost:3001/api";

// src/api/api.js
/**
 * fetch2 - Wrapper simplificado de fetch que parsea automáticamente la respuesta JSON.
 * @param {string}  url  - URL completa a llamar
 * @param {object}  opts - Opciones de fetch (method, headers, body, etc.)
 * @returns {Promise<any>} Los datos JSON de la respuesta
 */
export const API_URL = "http://localhost:3001/api";

export const fetch2 = (url, opts) =>
  fetch(url, opts).then((r) => {
    if (!r.ok) throw new Error("Error en la petición");
    return r.json();
  });

