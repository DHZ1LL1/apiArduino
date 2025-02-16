const Config = require("../models/config");

// Obtener la configuración inicial
exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne(); // Obtener solo un objeto
    if (!config) return res.status(404).json({ error: "No hay configuración disponible" });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo configuración" });
  }
};

// Actualizar configuración
exports.updateConfig = async (req, res) => {
  try {
    const { parametro, valor } = req.body;
    
    // Verificar que los valores existan en la petición
    if (!parametro || valor === undefined) {
      return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const updatedConfig = await Config.findOneAndUpdate(
      { parametro }, // Buscar por nombre del parámetro
      { $set: { valor } }, // Actualizar el valor
      { new: true, upsert: true, runValidators: true } // Opciones para actualización
    );

    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando configuración" });
  }
};
