/**
 * @file src/main.jsx
 * @description Punto de entrada de la aplicación React.
 *
 * Vite ejecuta este archivo primero. Monta <App /> en el <div id="root">
 * que está en index.html.
 *
 * React.StrictMode activa advertencias extra en desarrollo
 * (doble render de efectos, APIs deprecadas). Sin efecto en producción.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Monta toda la aplicación React en el elemento #root del HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
