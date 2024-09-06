"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const app_1 = __importDefault(require("./app")); // Importa la configuración principal de la aplicación
const dotenv_1 = __importDefault(require("dotenv"));
// Configuración de variables de entorno
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Inicia el servidor
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
