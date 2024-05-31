require('dotenv').config();
const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io', // Use the correct Mailtrap SMTP host
      port: 587, // Use 587 for TLS
      secure: false, // Use true for SSL (port 465)
      auth: {
        user: process.env.EMAIL_USER, // Ensure this is correctly set in your .env file
        pass: process.env.EMAIL_PASS, // Ensure this is correctly set in your .env file
      },
      tls: {
        rejectUnauthorized: false // This allows the connection even if the server is using a self-signed certificate
      }
    });

    const mailOptions = {
      from: 'passwordreset@eco-sphere.com',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://eco-sphere.com/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p>Please click on the following link, or paste this into your browser to complete the process:</p><p><a href="http://eco-sphere.com/reset/${token}">Reset Password</a></p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password recovery email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password recovery email');
  }
};

module.exports = sendRecoveryEmail;
