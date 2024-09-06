// backend/utils/mailer.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configura el transporte de correo usando nodemailer
const transporter = nodemailer.createTransport({
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
export async function sendVerificationEmail(to: string, token: string): Promise<void> {
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
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}
