"use strict";
// src/services/userService.ts
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
exports.verify2FAToken = exports.generate2FASecret = exports.authenticateUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Cambié de 'bcrypt' a 'bcryptjs' para compatibilidad.
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const User_1 = __importDefault(require("../models/User")); // Asegúrate de que la importación es correcta
/**
 * Servicio para crear un usuario con encriptación de contraseña.
 * @param userData Datos del usuario a crear.
 * @returns El usuario creado.
 */
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Encripta la contraseña del usuario
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
    const newUser = new User_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    // Guarda el usuario en la base de datos
    yield newUser.save();
    return newUser;
});
exports.createUser = createUser;
/**
 * Servicio para autenticar un usuario mediante email y contraseña.
 * @param credentials Credenciales de inicio de sesión (email y contraseña).
 * @returns Un JWT si la autenticación es exitosa.
 */
const authenticateUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: credentials.email });
    if (!user || !(yield bcryptjs_1.default.compare(credentials.password, user.password))) {
        throw new Error('Invalid email or password');
    }
    // Genera un token JWT para el usuario autenticado
    return jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
});
exports.authenticateUser = authenticateUser;
/**
 * Genera un secreto para 2FA y devuelve la URL del código QR.
 * @param user Usuario al que se le generará el 2FA.
 * @returns URL del código QR para configurar la autenticación en dos factores.
 */
const generate2FASecret = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const secret = speakeasy_1.default.generateSecret({ name: 'IncluTeac' });
    // Verifica que otpauth_url no sea undefined antes de convertirlo a un código QR
    const otpauthUrl = (_a = secret.otpauth_url) !== null && _a !== void 0 ? _a : ''; // Asegura que otpauthUrl no sea undefined
    const data_url = yield qrcode_1.default.toDataURL(otpauthUrl);
    // Asigna el secreto al usuario y guarda los cambios
    user.twoFactorSecret = secret.base32;
    yield user.save();
    return data_url;
});
exports.generate2FASecret = generate2FASecret;
/**
 * Verifica el token de 2FA proporcionado por el usuario.
 * @param user Usuario que intenta autenticarse con 2FA.
 * @param token Token de 2FA proporcionado.
 * @returns Verdadero si el token es válido, falso en caso contrario.
 */
const verify2FAToken = (user, token) => {
    // Verifica que el secreto 2FA no sea undefined
    if (!user.twoFactorSecret) {
        throw new Error('2FA secret is not set for this user.');
    }
    return speakeasy_1.default.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });
};
exports.verify2FAToken = verify2FAToken;
