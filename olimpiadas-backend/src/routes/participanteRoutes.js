// src/routes/colegioRoutes.js
const express = require("express");
const router = express.Router();
const participanteController = require("../controllers/participanteController");

// Definimos las rutas. Nota que usamos "/" porque el prefijo "/api/colegio" se pone en el server.js
router.get("/", participanteController.getParticipante);
router.post("/", participanteController.createParticipante);

module.exports = router;
