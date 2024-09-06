"use strict";
// src/services/emailService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("../utils/mailer");
const User_1 = __importDefault(require("../models/User")); // Asegúrate de que la ruta sea correcta y que el modelo esté bien configurado
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid"); // Importa la función para generar UUIDs
/**
 * Envía un correo electrónico de verificación al usuario basado en su ID.
 * @param userId - El ID del usuario.
 */
function sendVerificationEmailByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Valida que el ID sea un ObjectId de Mongoose válido
            if (!mongoose_1.Types.ObjectId.isValid(userId)) {
                throw new Error('Invalid user ID format.');
            }
            // Busca al usuario en la base de datos por su ID
            const user = yield User_1.default.findById(userId);
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
                yield user.save(); // Guarda el usuario con el nuevo token
            }
            // Envía el correo electrónico de verificación
            yield (0, mailer_1.sendVerificationEmail)(recipient, token);
            console.log('Verification email sent successfully to:', recipient);
        }
        catch (error) {
            console.error('Failed to send verification email:', error);
        }
    });
}
/**
 * Genera un token de verificación utilizando UUID.
 * @returns Un token de verificación generado.
 */
function generateVerificationToken() {
    return (0, uuid_1.v4)(); // Genera un UUID único como token de verificación
}
// Ejemplo de uso: llama a la función con el ID del usuario (reemplaza con un ID real de la base de datos)
sendVerificationEmailByUserId('64f3b2e4f5b9e013b4f029da');
