const Config = require("../models/config");

// Obtener la configuración inicial del Arduino
exports.getConfig = async (req, res) => {
  try {
    const config = await Config.find();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo configuración" });
  }
};

// Actualizar configuración
exports.updateConfig = async (req, res) => {
  try {
    const { parametro, valor } = req.body;
    const updatedConfig = await Config.findOneAndUpdate(
      { parametro },
      { valor },
      { new: true, upsert: true }
    );
    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando configuración" });
  }
};