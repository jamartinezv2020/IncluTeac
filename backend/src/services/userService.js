"use strict";
// src/services/userService.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify2FAToken = exports.generate2FASecret = exports.authenticateUser = exports.createUser = void 0;
var bcryptjs_1 = require("bcryptjs"); // Cambié de 'bcrypt' a 'bcryptjs' para compatibilidad.
var jsonwebtoken_1 = require("jsonwebtoken");
var speakeasy_1 = require("speakeasy");
var qrcode_1 = require("qrcode");
var User_1 = require("../entities/User"); // Asegúrate de que la importación de User sea correcta y exista el archivo correspondiente.
/**
 * Servicio para crear un usuario con encriptación de contraseña.
 * @param userData Datos del usuario a crear.
 * @returns El usuario creado.
 */
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcryptjs_1.default.hash(userData.password, 10)];
            case 1:
                hashedPassword = _a.sent();
                newUser = new User_1.User(__assign(__assign({}, userData), { password: hashedPassword }));
                // Guarda el usuario en la base de datos
                return [4 /*yield*/, newUser.save()];
            case 2:
                // Guarda el usuario en la base de datos
                _a.sent();
                return [2 /*return*/, newUser];
        }
    });
}); };
exports.createUser = createUser;
/**
 * Servicio para autenticar un usuario mediante email y contraseña.
 * @param credentials Credenciales de inicio de sesión (email y contraseña).
 * @returns Un JWT si la autenticación es exitosa.
 */
var authenticateUser = function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.User.findOne({ email: credentials.email })];
            case 1:
                user = _b.sent();
                _a = !user;
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(credentials.password, user.password)];
            case 2:
                _a = !(_b.sent());
                _b.label = 3;
            case 3:
                if (_a) {
                    throw new Error('Invalid email or password');
                }
                // Genera un token JWT para el usuario autenticado
                return [2 /*return*/, jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' })];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
/**
 * Genera un secreto para 2FA y devuelve la URL del código QR.
 * @param user Usuario al que se le generará el 2FA.
 * @returns URL del código QR para configurar la autenticación en dos factores.
 */
var generate2FASecret = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var secret, data_url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                secret = speakeasy_1.default.generateSecret({ name: 'IncluTeac' });
                return [4 /*yield*/, qrcode_1.default.toDataURL(secret.otpauth_url)];
            case 1:
                data_url = _a.sent();
                // Asigna el secreto al usuario y guarda los cambios
                user.twoFactorSecret = secret.base32;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, data_url];
        }
    });
}); };
exports.generate2FASecret = generate2FASecret;
/**
 * Verifica el token de 2FA proporcionado por el usuario.
 * @param user Usuario que intenta autenticarse con 2FA.
 * @param token Token de 2FA proporcionado.
 * @returns Verdadero si el token es válido, falso en caso contrario.
 */
var verify2FAToken = function (user, token) {
    return speakeasy_1.default.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: token,
    });
};
exports.verify2FAToken = verify2FAToken;
