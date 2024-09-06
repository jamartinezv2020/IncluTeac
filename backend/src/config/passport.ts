// backend/src/config/passport.ts

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User'; // Ajusta la ruta correctamente


passport.use(new LocalStrategy(
  async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
    try {
      const user = await User.findOne({ email: username }); // Usa `email` si estás buscando por correo
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      // Lógica de validación de contraseña
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
