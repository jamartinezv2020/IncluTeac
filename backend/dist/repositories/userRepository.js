"use strict";
// src/repositories/userRepository.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const userDao = __importStar(require("../daos/userDao"));
const crypto = __importStar(require("crypto"));
const mailer_1 = require("../utils/mailer");
/**
 * Crea un nuevo usuario.
 * @param userData Datos del usuario.
 * @returns El usuario creado.
 */
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Aquí se podrían agregar validaciones o transformaciones adicionales si fuera necesario
    // Crear el usuario en la base de datos usando el DAO
    const user = yield userDao.createUser(userData);
    // Generar un token de verificación para el usuario
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    // Guardar el usuario con el token de verificación
    yield user.save();
    // Enviar el correo de verificación al usuario
    yield (0, mailer_1.sendVerificationEmail)(user.email, verificationToken);
    return user;
});
exports.createUser = createUser;
/**
 * Obtiene un usuario por su ID.
 * @param id ID del usuario.
 * @returns El usuario encontrado o null.
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.findUserById(id);
});
exports.getUserById = getUserById;
/**
 * Obtiene un usuario por su email.
 * @param email Email del usuario.
 * @returns El usuario encontrado o null.
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.findUserByEmail(email);
});
exports.getUserByEmail = getUserByEmail;
/**
 * Actualiza un usuario por su ID.
 * @param id ID del usuario.
 * @param updateData Datos para actualizar.
 * @returns El usuario actualizado o null.
 */
const updateUser = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.updateUserById(id, updateData);
});
exports.updateUser = updateUser;
/**
 * Elimina un usuario por su ID.
 * @param id ID del usuario.
 * @returns El usuario eliminado o null.
 */
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.deleteUserById(id);
});
exports.deleteUser = deleteUser;
