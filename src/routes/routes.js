const express = require("express");
const router = express.Router();

const sensorRoutes = require("./sensors");  // Importar las rutas de sensores
const booksRoutes = require("./sensors");  // Parece que aquí defines rutas para libros
const configRoutes = require("./config");  // Asegúrate de tener este archivo si lo usas

// Usar las rutas correctamente
router.use("/sensors", sensorRoutes);  // Esto hará que las rutas sean /api/sensors
router.use("/books", booksRoutes);  // Ahora se accede con /api/books
router.use("/config", configRoutes);

module.exports = router;
