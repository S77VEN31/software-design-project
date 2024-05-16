import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app"; // Importa la configuración de tu aplicación Express
import { connect } from "./database"; // Conecta a la base de datos

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define el puerto
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos de la carpeta dist
const distPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(distPath));

// Ruta para servir el archivo HTML de la build de React
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Conecta a la base de datos
  connect();
  console.log("Database connected");
});
