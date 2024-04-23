// Crear función catchError para capturar errores
const catchError = controller => {
    return (req, res, next) => {
      // Llamar al controlador y capturar errores
      controller(req, res, next).catch(next);
    }
  }
  
  // Exportar función catchError
  module.exports = catchError;