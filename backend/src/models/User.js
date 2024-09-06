"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/models/User.ts
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'alumno' },
    avatar: { type: String },
    googleId: { type: String },
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
