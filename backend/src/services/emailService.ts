// src/services/emailService.ts

import { sendVerificationEmail } from '../utils/mailer';
import User from '../models/User'; // Asegúrate de que la ruta sea correcta y que el modelo esté bien configurado
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUIDs

/**
 * Envía un correo electrónico de verificación al usuario basado en su ID.
 * @param userId - El ID del usuario.
 */
async function sendVerificationEmailByUserId(userId: string) {
  try {
    // Valida que el ID sea un ObjectId de Mongoose válido
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format.');
    }

    // Busca al usuario en la base de datos por su ID
    const user = await User.findById(userId);

    // Si el usuario no existe, lanza un error
    if (!user) {
      throw new Error('User not found.');
    }

    // Obtiene el correo electrónico y el token de verificación del usuario
    const recipient = user.email; // Dirección de correo electrónico del destinatario
    const token = user.verificationToken || generateVerificationToken(); // Genera un nuevo token si no existe

    // Si el token no estaba definido previamente, guárdalo en el usuario
    if (!user.verificationToken) {
      user.verificationToken = token;
      await user.save(); // Guarda el usuario con el nuevo token
    }

    // Envía el correo electrónico de verificación
    await sendVerificationEmail(recipient, token);
    console.log('Verification email sent successfully to:', recipient);
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
}

/**
 * Genera un token de verificación utilizando UUID.
 * @returns Un token de verificación generado.
 */
function generateVerificationToken(): string {
  return uuidv4(); // Genera un UUID único como token de verificación
}

// Ejemplo de uso: llama a la función con el ID del usuario (reemplaza con un ID real de la base de datos)
sendVerificationEmailByUserId('64f3b2e4f5b9e013b4f029da'); 


