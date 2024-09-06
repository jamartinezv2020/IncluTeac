// src/services/apiService.ts

// Importar axios para realizar las solicitudes HTTP al backend
import axios from 'axios';

// URL base para las solicitudes al backend
const API_URL = 'http://localhost:5000/api'; // Cambia la URL según tu configuración

// Define interfaces para las respuestas de la API
interface AuthResponse {
  token: string; // Suponiendo que el JWT se devuelve como 'token'
}

interface TwoFAResponse {
  qrCodeUrl: string;
}

interface Verify2FAResponse {
  isValid: boolean;
}

/**
 * Crea un nuevo usuario en el sistema.
 * @param userData Datos del usuario que se va a crear.
 * @returns Datos del usuario creado.
 */
export const createUser = async (userData: { name: string; email: string; password: string; role?: string }) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Autentica un usuario con email y contraseña.
 * @param credentials Credenciales de inicio de sesión (email y contraseña).
 * @returns Un objeto con el token JWT u otros datos necesarios.
 */
export const authenticateUser = async (credentials: { email: string; password: string }): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const data = response.data; // Obtiene los datos de la respuesta

    // Verifica que data tenga la propiedad token
    if (typeof data === 'object' && data !== null && 'token' in data) {
      return (data as AuthResponse).token; // Asegúrate de que el backend devuelve un objeto con la propiedad 'token'
    } else {
      throw new Error('Invalid response format'); // Maneja el caso en que la respuesta no tenga el formato esperado
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

/**
 * Genera un código QR para la configuración de 2FA.
 * @param userId ID del usuario para generar 2FA.
 * @returns URL del código QR para escanear.
 */
export const generate2FA = async (userId: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/2fa`);
    const data = response.data as TwoFAResponse; // Cast al tipo TwoFAResponse
    return data.qrCodeUrl;
  } catch (error) {
    console.error('Error generating 2FA QR code:', error);
    throw error;
  }
};

/**
 * Verifica un token de 2FA.
 * @param userId ID del usuario.
 * @param token Token de 2FA ingresado por el usuario.
 * @returns Verdadero si el token es válido.
 */
export const verify2FAToken = async (userId: string, token: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/2fa/verify`, { token });
    const data = response.data as Verify2FAResponse; // Cast al tipo Verify2FAResponse
    return data.isValid;
  } catch (error) {
    console.error('Error verifying 2FA token:', error);
    throw error;
  }
};

