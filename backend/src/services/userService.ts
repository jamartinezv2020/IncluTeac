// src/services/userService.ts

import bcrypt from 'bcryptjs'; // Cambié de 'bcrypt' a 'bcryptjs' para compatibilidad.
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { IUser, User } from '../entities/User'; // Asegúrate de que la importación de User sea correcta y exista el archivo correspondiente.

/**
 * Servicio para crear un usuario con encriptación de contraseña.
 * @param userData Datos del usuario a crear.
 * @returns El usuario creado.
 */
export const createUser = async (userData: IUser): Promise<IUser> => {
  // Encripta la contraseña del usuario
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });

  // Guarda el usuario en la base de datos
  await newUser.save();
  return newUser;
};

/**
 * Servicio para autenticar un usuario mediante email y contraseña.
 * @param credentials Credenciales de inicio de sesión (email y contraseña).
 * @returns Un JWT si la autenticación es exitosa.
 */
export const authenticateUser = async (credentials: { email: string; password: string }): Promise<string> => {
  const user = await User.findOne({ email: credentials.email });
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error('Invalid email or password');
  }

  // Genera un token JWT para el usuario autenticado
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
};

/**
 * Genera un secreto para 2FA y devuelve la URL del código QR.
 * @param user Usuario al que se le generará el 2FA.
 * @returns URL del código QR para configurar la autenticación en dos factores.
 */
export const generate2FASecret = async (user: IUser): Promise<string> => {
  const secret = speakeasy.generateSecret({ name: 'IncluTeac' });

  // Convierte la URL OTP a un código QR
  const data_url = await qrcode.toDataURL(secret.otpauth_url);

  // Asigna el secreto al usuario y guarda los cambios
  user.twoFactorSecret = secret.base32;
  await user.save();

  return data_url;
};

/**
 * Verifica el token de 2FA proporcionado por el usuario.
 * @param user Usuario que intenta autenticarse con 2FA.
 * @param token Token de 2FA proporcionado.
 * @returns Verdadero si el token es válido, falso en caso contrario.
 */
export const verify2FAToken = (user: IUser, token: string): boolean => {
  return speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
  });
};
