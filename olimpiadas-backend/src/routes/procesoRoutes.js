const express = require("express");
const router = express.Router();
const {ejecutarFuncionOlimpiada,} = require("../controllers/procesoController");

// Definimos la sub-ruta
router.post("/consultar-olimpiada", ejecutarFuncionOlimpiada);

module.exports = router;
