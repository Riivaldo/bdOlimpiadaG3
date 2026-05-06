// src/routes/personaRoutes.js
const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");

// Definimos las rutas. Nota que usamos "/" porque el prefijo "/api/personas" se pone en el server.js
router.get("/", personaController.getPersonas);
router.post("/", personaController.createPersona);

module.exports = router;
