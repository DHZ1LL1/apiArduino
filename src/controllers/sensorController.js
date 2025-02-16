const SensorData = require("../models/SensorData");

// Recibir datos de sensores desde Arduino y guardarlos en MongoDB
exports.receiveSensorData = async (req, res) => {
  try {
    const { tipo, valor } = req.body;

    // Validar que se envíen los datos correctamente
    if (!tipo || valor === undefined) {
      return res.status(400).json({ error: "Faltan datos en la petición" });
    }

    // Crear un nuevo dato de sensor
    const newSensorData = new SensorData({ tipo, valor });
    await newSensorData.save();

    res.status(201).json({ mensaje: "✅ Dato guardado", dato: newSensorData });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al guardar en la base de datos", detalle: error.message });
  }
};

// Obtener los últimos valores de los sensores
exports.getSensorData = async (req, res) => {
  try {
    const datos = await SensorData.find().sort({ fecha: -1 }).limit(10);
    
    if (!datos.length) {
      return res.status(404).json({ error: "❌ No hay datos de sensores disponibles" });
    }

    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: "❌ Error al obtener datos", detalle: error.message });
  }
};
