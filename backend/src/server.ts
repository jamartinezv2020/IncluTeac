// backend/src/server.ts

// Importación de módulos y configuraciones necesarias
import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from './config/passport'; // Verifica que el archivo de configuración de Passport esté bien
import userRoutes from './routes/userRoutes'; // Verifica que las rutas estén correctamente configuradas

// Configuración de variables de entorno
dotenv.config();

// Creación de la aplicación Express
const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bd_incluteac';

// Middleware
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Rutas
app.use('/api/users', userRoutes);

// Conexión a la base de datos MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
