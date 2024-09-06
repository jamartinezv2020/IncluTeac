// backend/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
verificationToken?: string; // Asegúrate de que esta propiedad esté definida
  name: string;
  email: string;
  password: string;
  twoFactorSecret?: string; // Asegúrate de incluir cualquier campo adicional necesario
  role: string;
  avatar: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'alumno' },
  avatar: { type: String },
  googleId: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
