const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/User.js');
const jwtMiddleware = require('./middleware/jwtMiddleware');
const githubRoutes = require('./routes/githubRoutes');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas públicas
app.get('/', (req, res) => {
  res.send('¡Backend MERN funcionando!');
});

// Rutas de usuario
app.use('/api/users', userRoutes);

app.use('/github', githubRoutes);

// Ejemplo de ruta protegida con JWT
app.get('/api/protected', jwtMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida, usuario autenticado.' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
