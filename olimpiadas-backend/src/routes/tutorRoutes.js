// src/routes/tutorRoutes.js
const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");

// Definimos las rutas. Nota que usamos "/" porque el prefijo "/api/tutor" se pone en el server.js
router.get("/", tutorController.getTutores);
router.post("/", tutorController.createTutores);

module.exports = router;
