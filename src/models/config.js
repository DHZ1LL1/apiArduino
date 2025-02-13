const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  parametro: { type: String, required: true, unique: true },
  valor: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Config", ConfigSchema);