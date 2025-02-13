const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/database");
require("dotenv").config();
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Permitir conexiones de la Web y Arduino
});

const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());

// Importar rutas
const configRoutes = require("./src/routes/config");
const sensorRoutes = require("./src/routes/sensors");
const actuatorRoutes = require("./src/routes/actuators");

// Definir rutas en el servidor
app.use("/config", configRoutes);
app.use("/sensors", sensorRoutes);
app.use("/actuators", actuatorRoutes);

// WebSocket: Manejar conexiones
io.on("connection", (socket) => {
  console.log("🔌 Cliente conectado:", socket.id);

  socket.on("control-led", (estado) => {
    console.log(`💡 LED cambiado a: ${estado}`);
    io.emit("update-led", estado); // Enviar actualización a Web y Arduino
  });

  socket.on("control-servo", (angulo) => {
    console.log(`🔄 Servomotor movido a: ${angulo}°`);
    io.emit("update-servo", angulo);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
