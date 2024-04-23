// Importar modelo EmailCode
const EmailCode = require("./EmailCode");

// Importar modelo User
const User = require("./User");


EmailCode.belongsTo(User)
User.hasMany(EmailCode)