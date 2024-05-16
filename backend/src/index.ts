import express from "express";
import path from "path";
import app from "./app"; // Importa la configuración de tu aplicación Express
import { connect } from "./database"; // Conecta a la base de datos

// Define el puerto
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos de la carpeta build
const buildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(buildPath));

// Ruta para servir el archivo HTML de la build de React
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Conecta a la base de datos
  connect();
  console.log("Database connected");
});