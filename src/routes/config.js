const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");

/**
 * @swagger
 * /api/config:
 *   get:
 *     summary: Obtener la configuración inicial del sistema
 *     description: Retorna la configuración almacenada en la base de datos.
 *     responses:
 *       200:
 *         description: Configuración obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modo:
 *                   type: string
 *                   example: "automático"
 *                 umbral:
 *                   type: number
 *                   example: 50
 */
router.get("/", configController.getConfig);

/**
 * @swagger
 * /api/config:
 *   put:
 *     summary: Actualizar configuración del sistema
 *     description: Modifica los parámetros de configuración en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modo:
 *                 type: string
 *                 example: "manual"
 *               umbral:
 *                 type: number
 *                 example: 75
 *     responses:
 *       200:
 *         description: Configuración actualizada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.put("/", configController.updateConfig);

module.exports = router;
