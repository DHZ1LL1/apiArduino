const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API para Sensores y Actuadores",
      version: "1.0.0",
      description: "Documentación de la API que gestiona sensores y actuadores con WebSockets y MongoDB.",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger UI disponible en http://localhost:4000/api-docs");
};

module.exports = setupSwagger;
