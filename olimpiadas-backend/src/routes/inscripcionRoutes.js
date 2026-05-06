const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcionController");

router.get("/", inscripcionController.getInscripcion);
router.post("/", inscripcionController.createInscripcion );

module.exports = router;