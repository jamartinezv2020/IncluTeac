"use strict";
// backend/utils/mailer.ts
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
exports.sendVerificationEmail = sendVerificationEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno
dotenv_1.default.config();
// Configura el transporte de correo usando nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
/**
 * Envía un correo electrónico de verificación.
 * @param to - Dirección de correo electrónico del destinatario.
 * @param token - Token de verificación para incluir en el correo.
 */
function sendVerificationEmail(to, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const verificationUrl = `http://yourdomain.com/verify?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER, // Dirección de correo electrónico del remitente
            to,
            subject: 'Verify Your Email Address',
            text: `Please verify your email address by clicking the following link: ${verificationUrl}`,
            html: `<p>Please verify your email address by clicking the following link:</p>
           <a href="${verificationUrl}">Verify Email</a>`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully.');
        }
        catch (error) {
            console.error('Error sending verification email:', error);
            throw new Error('Failed to send verification email');
        }
    });
}
