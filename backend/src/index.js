"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
var app_1 = require("./app"); // Importa la configuración principal de la aplicación
var dotenv_1 = require("dotenv");
// Configuración de variables de entorno
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
// Inicia el servidor
app_1.default.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
