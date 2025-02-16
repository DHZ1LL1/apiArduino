const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

/**
 * @swagger
 * /api/sensors:
 *   post:
 *     summary: Recibir datos de sensores desde Arduino
 *     description: Guarda los valores de los sensores enviados por Arduino en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "temperatura"
 *               valor:
 *                 type: number
 *                 example: 22.5
 *     responses:
 *       201:
 *         description: Datos guardados correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", sensorController.receiveSensorData);

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     summary: Obtener los últimos valores de los sensores
 *     description: Devuelve los datos más recientes registrados por los sensores.
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "65d76a3e2f4b4d001c8e2b65"
 *                   tipo:
 *                     type: string
 *                     example: "humedad"
 *                   valor:
 *                     type: number
 *                     example: 40.1
 */
router.get("/", sensorController.getSensorData);

module.exports = router;
