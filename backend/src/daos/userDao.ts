// src/daos/userDao.ts

import User, { IUser } from '../models/User';

/**
 * Crea un nuevo usuario en la base de datos.
 * @param userData Datos del usuario a crear.
 * @returns El usuario creado.
 */
export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Busca un usuario por su ID.
 * @param id ID del usuario a buscar.
 * @returns El usuario encontrado o null si no existe.
 */
export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).exec();
};

/**
 * Busca un usuario por su email.
 * @param email Email del usuario a buscar.
 * @returns El usuario encontrado o null si no existe.
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email }).exec();
};

/**
 * Actualiza un usuario por su ID.
 * @param id ID del usuario a actualizar.
 * @param updateData Datos para actualizar el usuario.
 * @returns El usuario actualizado o null si no existe.
 */
export const updateUserById = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

/**
 * Elimina un usuario por su ID.
 * @param id ID del usuario a eliminar.
 * @returns El usuario eliminado o null si no existe.
 */
export const deleteUserById = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id).exec();
};
