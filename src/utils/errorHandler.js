// Crear función para manejar errores
const errorHandler = (error, _req, res, _next) => {
    // Si el error es de validación, devolver errores
    if(error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errores });
    }
    // Si el error es de clave foránea, devolver mensaje de error
    if(error.name === 'SequelizeForeignKeyConstraintError'){
      return res.status(400).json({ mensaje: error.message });
    }
    // Si el error es de base de datos, devolver mensaje de error
    if(error.name === 'SequelizeDatabaseError'){
      return res.status(400).json({ mensaje: error.message });
    }
    // Si es otro tipo de error, devolver mensaje de error general
    return res.status(500).json({ mensaje: error.message });
  }
  
  // Exportar función para manejar errores
  module.exports = errorHandler;