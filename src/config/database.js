require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB conectado en: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

// 📌 Eventos para manejar la conexión
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB desconectado. Intentando reconectar...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error en MongoDB:", err.message);
});

module.exports = connectDB;
