"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/app.ts
var express_1 = require("express");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var express_2 = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var app = (0, express_1.default)();
// Configuraciones iniciales de la aplicación
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: false }));
// Rutas de la API
app.use('/api/users', userRoutes_1.default);
exports.default = app;
