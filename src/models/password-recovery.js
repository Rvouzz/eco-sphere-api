const bcrypt = require("bcrypt");
const { dbPool } = require("../config/database");
const moment = require('moment');

const generatePasswordRecoveryOTP = async (userEmail) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiration = Date.now() + 15 * 60 * 1000;

  const formattedExpiration = moment(expiration).format('YYYY-MM-DD HH:mm:ss');

  const SQLQuery = `UPDATE user SET resetPasswordOTP = ?, resetPasswordExpires = ? WHERE email = ?`;
  await dbPool.execute(SQLQuery, [otp, formattedExpiration, userEmail]);

  return otp;
};

const resetPasswordWithOTP = async (userEmail, otp, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const SQLQuery = `
    UPDATE user
    SET password = ?, resetPasswordOTP = NULL, resetPasswordExpires = NULL
    WHERE email = ? AND resetPasswordOTP = ? AND resetPasswordExpires > ?
  `;

  const [result] = await dbPool.execute(SQLQuery, [hashedPassword, userEmail, otp, currentTime]);

  if (result.affectedRows === 0) {
    throw new Error('OTP is invalid or has expired');
  }
};

module.exports = {
  generatePasswordRecoveryOTP,
  resetPasswordWithOTP
};
