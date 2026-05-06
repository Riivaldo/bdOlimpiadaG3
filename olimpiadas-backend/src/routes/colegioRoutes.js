// src/routes/colegioRoutes.js
const express = require("express");
const router = express.Router();
const colegioController = require("../controllers/colegioController");

// Definimos las rutas. Nota que usamos "/" porque el prefijo "/api/colegio" se pone en el server.js
router.get("/", colegioController.getColegios);
router.post("/", colegioController.createColegio);

module.exports = router;
