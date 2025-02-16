const express = require("express");
const router = express.Router();
const actuatorController = require("../controllers/actuatorController");

/**
 * @swagger
 * /api/actuators/led/{state}:
 *   get:
 *     summary: Controlar el LED
 *     description: Enciende o apaga el LED del sistema.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["on", "off"]
 *         description: Estado del LED (on = encender, off = apagar)
 *     responses:
 *       200:
 *         description: LED actualizado correctamente
 *       400:
 *         description: Estado inválido
 */
router.get("/led/:state", actuatorController.controlLED);

/**
 * @swagger
 * /api/actuators/servo:
 *   post:
 *     summary: Controlar un servomotor
 *     description: Envía un ángulo al servomotor para que cambie su posición.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               angulo:
 *                 type: number
 *                 example: 90
 *     responses:
 *       200:
 *         description: Servomotor movido correctamente
 *       400:
 *         description: Ángulo inválido
 */
router.post("/servo", actuatorController.controlServo);

module.exports = router;
