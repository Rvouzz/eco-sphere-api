require('dotenv').config();
const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (email, otp) => {
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
      text: `Hello,\n\nYou are receiving this email because a password reset request for your account was received.\n\nPlease use the following One-Time Password (OTP) to reset your password:\n\n${otp}\n\nIf you did not request a password reset, please ignore this email. Your password will remain unchanged.\n\nThank you,\nEco-Sphere Support Team`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #fff; background-color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #68D2E8;">Hello,</h2>
        <p style="font-size: 16px; color: #fff;">You are receiving this email because a password reset request for your account was received.</p>
        <p style="font-size: 16px; color: #fff;">Please use the following One-Time Password (OTP) to reset your password:</p>
        <p style="text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #fff;">
          ${otp}
        </p>
        <p style="font-size: 16px; color: #fff;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p style="font-size: 16px; color: #fff;">Thank you,</p>
        <p style="font-size: 16px; color: #4CAF50; font-weight: bold;">Eco-Sphere Support Team</p>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">If you have any questions, please contact our support team at <a href="mailto:support@eco-sphere.com" style="color: #4CAF50; text-decoration: none;">eco.sphere2k24@gmail.com</a>.</p>
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