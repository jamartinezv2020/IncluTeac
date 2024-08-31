// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

// Configuraciones iniciales de la aplicación
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

// Rutas de la API
app.use('/api/users', userRoutes);

export default app;
