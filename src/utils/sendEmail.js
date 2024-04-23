// Importar biblioteca para enviar correos electrónicos
const nodemailer = require('nodemailer');

// Crear función para enviar correos electrónicos
const sendEmail = (options) => {
  // Configurar transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  // Configurar opciones de correo electrónico
  const mailOptions = {
    from: process.env.EMAIL,
   ...options
  }

  // Enviar correo electrónico
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado:'+ info.response);
    }
  });
}

// Exportar función para enviar correos electrónicos
module.exports = { sendEmail }