// src/repositories/userRepository.ts

import { IUser } from '../models/User';
import * as userDao from '../daos/userDao';
import * as crypto from 'crypto';
import { sendVerificationEmail } from '../utils/mailer';

/**
 * Crea un nuevo usuario.
 * @param userData Datos del usuario.
 * @returns El usuario creado.
 */
export const createUser = async (userData: IUser): Promise<IUser> => {
  // Aquí se podrían agregar validaciones o transformaciones adicionales si fuera necesario

  // Crear el usuario en la base de datos usando el DAO
  const user = await userDao.createUser(userData);

  // Generar un token de verificación para el usuario
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = verificationToken;
  
  // Guardar el usuario con el token de verificación
  await user.save();

  // Enviar el correo de verificación al usuario
  await sendVerificationEmail(user.email, verificationToken);

  return user;
};

/**
 * Obtiene un usuario por su ID.
 * @param id ID del usuario.
 * @returns El usuario encontrado o null.
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await userDao.findUserById(id);
};

/**
 * Obtiene un usuario por su email.
 * @param email Email del usuario.
 * @returns El usuario encontrado o null.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userDao.findUserByEmail(email);
};

/**
 * Actualiza un usuario por su ID.
 * @param id ID del usuario.
 * @param updateData Datos para actualizar.
 * @returns El usuario actualizado o null.
 */
export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  return await userDao.updateUserById(id, updateData);
};

/**
 * Elimina un usuario por su ID.
 * @param id ID del usuario.
 * @returns El usuario eliminado o null.
 */
export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await userDao.deleteUserById(id);
};

