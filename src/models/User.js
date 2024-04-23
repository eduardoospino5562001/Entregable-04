// Importar función para crear modelos
const { DataTypes } = require('sequelize');

// Conectar a la base de datos
const sequelize = require('../utils/connection');

// Crear modelo de usuario
const User = sequelize.define('user', {
  // Email del usuario
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Contraseña del usuario
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Nombre del usuario
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Apellido del usuario
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // País del usuario
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Imagen del usuario
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Estado de verificación del usuario
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Exportar modelo de usuario
module.exports = User;