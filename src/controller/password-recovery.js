const passwordModel = require("../models/password-recovery");
const sendRecoveryEmail = require("../middleware/emailMiddleware");
const validator = require("validator");

const requestPasswordRecovery = async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  try {
    const otp = await passwordModel.generatePasswordRecoveryOTP(email);
    await sendRecoveryEmail(email, otp);

    res.status(200).json({
      message: "Password recovery email sent",
    });
  } catch (error) {
    console.error("Error requesting password recovery:", error);

    res.status(500).json({
      message: "Failed to send password recovery email",
      serverMessage: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    await passwordModel.resetPasswordWithOTP(email, otp, newPassword);

    res.status(200).json({
      message: "Password has been reset",
    });
  } catch (error) {
    console.error("Error resetting password:", error);

    let errorMessage = "Internal server error";
    if (error.message === "OTP is invalid or has expired") {
      errorMessage = "Invalid or expired OTP";
    }

    res.status(400).json({
      message: errorMessage,
      serverMessage: error.message,
    });
  }
};

module.exports = {
  requestPasswordRecovery,
  resetPassword,
};
