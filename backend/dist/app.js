"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_2 = require("express");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Configuraciones iniciales de la aplicación
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: false }));
// Rutas de la API
app.use('/api/users', userRoutes_1.default);
exports.default = app;
