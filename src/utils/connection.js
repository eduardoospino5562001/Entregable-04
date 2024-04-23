// Importar Sequelize
const { Sequelize } = require('sequelize');

// Cargar configuración de la base de datos
require('dotenv').config();

// Conectar a la base de datos
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

// Exportar conexión a la base de datos
module.exports = sequelize;