const express = require("express");
const router = express.Router();
const actuatorController = require("../controllers/actuatorController");

// Ruta para controlar un LED
router.get("/led/:state", actuatorController.controlLED);

// Ruta para controlar un servomotor
router.post("/servo", actuatorController.controlServo);

module.exports = router;
