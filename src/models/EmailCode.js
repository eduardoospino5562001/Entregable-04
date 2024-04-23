// Importar DataTypes desde la biblioteca Sequelize
const { DataTypes } = require('sequelize');

// Importar la conexión a la base de datos desde el archivo../utils/connection
const sequelize = require('../utils/connection');

// Definir el modelo EmailCode utilizando la función define de Sequelize
const EmailCode = sequelize.define('emailCode', {

  // Definir la columna "code" con tipo de datos STRING y no permitir valores nulos
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

// Exportar el modelo EmailCode para que pueda ser utilizado en otros archivos
module.exports = EmailCode;