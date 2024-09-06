"use strict";
// backend/src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de módulos y configuraciones necesarias
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("./config/passport")); // Verifica que el archivo de configuración de Passport esté bien
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Verifica que las rutas estén correctamente configuradas
// Configuración de variables de entorno
dotenv_1.default.config();
// Creación de la aplicación Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bd_incluteac';
// Middleware
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
// Rutas
app.use('/api/users', userRoutes_1.default);
// Conexión a la base de datos MongoDB
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log('Conectado a la base de datos MongoDB');
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
});
// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
