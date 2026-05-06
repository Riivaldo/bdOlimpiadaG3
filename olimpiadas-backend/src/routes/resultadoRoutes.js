const express = require("express");
const router = express.Router();
const resultadoController = require("../controllers/resultadoController");

router.get("/", resultadoController.getResultado);
router.post("/", resultadoController.createResultado);

module.exports = router;