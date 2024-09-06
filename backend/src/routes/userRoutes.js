"use strict";
// backend/routes/userRoutes.ts
// src/routes/authRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("passport");
var router = express_1.default.Router();
// Ruta para iniciar la autenticación con Google
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Ruta de callback de Google
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    // Redirigir a la página de éxito después de la autenticación
    res.redirect('/dashboard');
});
exports.default = router;
