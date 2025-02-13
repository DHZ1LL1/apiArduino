const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
connectDB();

// Configurar rutas
app.use("/api", routes);

module.exports = app;
