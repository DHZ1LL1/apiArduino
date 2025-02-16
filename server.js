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

const PORT = process.env.PORT || 4000;

// Conectar a la base de datos con manejo de errores
connectDB()
  .then(() => console.log("✅ Conexión a MongoDB exitosa"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

// Importar rutas
const configRoutes = require("./src/routes/config");
const sensorRoutes = require("./src/routes/sensors");
const actuatorRoutes = require("./src/routes/actuators");

// Montar rutas en "/api/"
app.use("/api/config", configRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/actuators", actuatorRoutes);

// Importar y configurar Swagger (debe estar después de las rutas)
const setupSwagger = require("./src/config/SwaggerConfig"); // Ajusta la ruta si es necesario
setupSwagger(app);

console.log("✅ Rutas montadas correctamente");

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "❌ Ruta no encontrada" });
});

// WebSocket: Manejar conexiones
io.on("connection", (socket) => {
  console.log("🔌 Cliente conectado:", socket.id);

  socket.on("control-led", (estado) => {
    console.log(`💡 LED cambiado a: ${estado}`);
    io.emit("update-led", estado);
  });

  socket.on("control-servo", (angulo) => {
    console.log(`🔄 Servomotor movido a: ${angulo}°`);
    io.emit("update-servo", angulo);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

// Iniciar el servidor en 0.0.0.0
server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://${process.env.HOST || "localhost"}:${PORT}`);
});
