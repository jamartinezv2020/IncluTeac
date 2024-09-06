"use strict";
// backend/routes/userRoutes.ts
// src/routes/authRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Ruta para iniciar la autenticación con Google
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Ruta de callback de Google
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirigir a la página de éxito después de la autenticación
    res.redirect('/dashboard');
});
exports.default = router;
