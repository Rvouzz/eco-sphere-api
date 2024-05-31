require('dotenv').config();
const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Eco-Sphere Support" <passwordreset@eco-sphere.com>',
      to: email,
      subject: 'Eco-Sphere Password Reset Request',
      text: `Hello,

You are receiving this email because a password reset request for your account was received.

Please click the link below or copy and paste it into your browser to reset your password:

http://eco-sphere.com/reset/${token}

If you did not request a password reset, please ignore this email. Your password will remain unchanged.

Thank you,
Eco-Sphere Support Team`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello,</h2>
        <p>You are receiving this email because a password reset request for your account was received.</p>
        <p>Please click the link below or copy and paste it into your browser to reset your password:</p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="http://eco-sphere.com/reset/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you,</p>
        <p>Eco-Sphere Support Team</p>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">If you have any questions, please contact our support team at support@eco-sphere.com.</p>
      </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password recovery email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password recovery email');
  }
};

module.exports = sendRecoveryEmail;
