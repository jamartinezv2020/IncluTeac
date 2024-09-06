"use strict";
// src/daos/userDao.ts
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
exports.deleteUserById = exports.updateUserById = exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
/**
 * Crea un nuevo usuario en la base de datos.
 * @param userData Datos del usuario a crear.
 * @returns El usuario creado.
 */
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default(userData);
    return yield user.save();
});
exports.createUser = createUser;
/**
 * Busca un usuario por su ID.
 * @param id ID del usuario a buscar.
 * @returns El usuario encontrado o null si no existe.
 */
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(id).exec();
});
exports.findUserById = findUserById;
/**
 * Busca un usuario por su email.
 * @param email Email del usuario a buscar.
 * @returns El usuario encontrado o null si no existe.
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email }).exec();
});
exports.findUserByEmail = findUserByEmail;
/**
 * Actualiza un usuario por su ID.
 * @param id ID del usuario a actualizar.
 * @param updateData Datos para actualizar el usuario.
 * @returns El usuario actualizado o null si no existe.
 */
const updateUserById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndUpdate(id, updateData, { new: true }).exec();
});
exports.updateUserById = updateUserById;
/**
 * Elimina un usuario por su ID.
 * @param id ID del usuario a eliminar.
 * @returns El usuario eliminado o null si no existe.
 */
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndDelete(id).exec();
});
exports.deleteUserById = deleteUserById;
