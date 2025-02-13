const SensorData = require("../models/SensorData");

// Recibir datos de sensores desde Arduino y guardarlos en MongoDB
exports.receiveSensorData = async (req, res) => {
  try {
    const { tipo, valor } = req.body;
    if (!tipo || valor === undefined) {
      return res.status(400).json({ error: "Faltan datos en la petición" });
    }

    const newSensorData = new SensorData({ tipo, valor });
    await newSensorData.save();
    res.status(201).json({ mensaje: "Dato guardado", dato: newSensorData });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar en la base de datos" });
  }
};

// Obtener los últimos valores de los sensores
exports.getSensorData = async (req, res) => {
  try {
    const datos = await SensorData.find().sort({ fecha: -1 }).limit(10);
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
};
