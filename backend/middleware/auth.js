const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'No se proporcionó un token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error('Token no válido:', err);
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acceso denegado, necesitas privilegios de administrador' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
