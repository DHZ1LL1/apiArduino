const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
