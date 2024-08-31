// backend/routes/userRoutes.ts
// src/routes/authRoutes.ts

import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta para iniciar la autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirigir a la página de éxito después de la autenticación
    res.redirect('/dashboard');
  }
);

export default router;


