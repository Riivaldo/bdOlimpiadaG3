// src/routes/colegioRoutes.js
const express = require("express");
const router = express.Router();
const olimpiadaController = require("../controllers/olimpiadaController");

// Definimos las rutas. Nota que usamos "/" porque el prefijo "/api/colegio" se pone en el server.js
router.get("/", olimpiadaController.getOlimpiada);
router.post("/", olimpiadaController.createOlimpiada);

module.exports = router;
