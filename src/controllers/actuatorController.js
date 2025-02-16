const { io } = require("../../server");

// Controlar un LED
exports.controlLED = (req, res) => {
  const { state } = req.params;
  if (state !== "on" && state !== "off") {
    return res.status(400).json({ error: "Estado inválido, usa 'on' o 'off'" });
  }

  console.log(`💡 LED ${state.toUpperCase()}`);
  io.emit("update-led", state); // Notifica a Web y Arduino

  res.json({ message: `LED ${state}` });
};

// Controlar un servomotor
exports.controlServo = (req, res) => {
  const { angle } = req.body;
  if (angle < 0 || angle > 180) {
    return res.status(400).json({ error: "Ángulo inválido, debe estar entre 0 y 180" });
  }

  console.log(`🔄 Servomotor movido a ${angle}°`);
  io.emit("update-servo", angle); // Notifica a Web y Arduino

  res.json({ message: `Servomotor movido a ${angle}°` });
};
    
