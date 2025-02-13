const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

// Ruta para recibir datos de sensores desde Arduino
router.post("/data", sensorController.receiveSensorData);

// Ruta para obtener los últimos valores de los sensores
router.get("/data", sensorController.getSensorData);

module.exports = router;
