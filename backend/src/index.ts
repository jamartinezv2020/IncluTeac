// backend/src/index.ts
import app from './app'; // Importa la configuración principal de la aplicación
import dotenv from 'dotenv';

// Configuración de variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
