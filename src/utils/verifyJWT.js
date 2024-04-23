// Importar biblioteca para trabajar con tokens JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Crear función para verificar tokens JWT
const verifyJwt = (req, res, next) => {
  // Obtener header de autorización
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  // Verificar si el header es válido
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  
  // Extraer token del header
  const token = authHeader.split(' ')[1];
  
  // Verificar token con secreto
  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded) => {
      // Si hay un error, devolver estado 403
      if (err) return res.sendStatus(403);
      
      // Asignar usuario autenticado a req.user
      req.user = decoded.user;
      
      // Continuar con la solicitud
      next();
    }
  )
}

// Exportar función para verificar tokens JWT
module.exports = { verifyJwt };