const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function jwtMiddleware(req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado.' });
  }

  try {
    // Elimina la palabra "Bearer " del token
    const token = tokenHeader.replace('Bearer ', '');

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.error("We balling");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token no válido.' });
  }
}

module.exports = jwtMiddleware;
