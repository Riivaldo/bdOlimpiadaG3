const express = require("express");
const router = express.Router();
const {ejecutarFuncionOlimpiada,} = require("../controllers/procesoController");

// Definimos la sub-ruta
//poner el nombre de procesoController (ejecutarFuncionOlimpiada)
router.post("/consultar-olimpiada", ejecutarFuncionOlimpiada);

module.exports = router;
