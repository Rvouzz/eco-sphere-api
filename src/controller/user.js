const UserModel = require("../models/user");
const sendRecoveryEmail = require('../middleware/emailMiddleware');
const validator = require('validator');

const getAllUser = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUser();
    res.json({
      message: "GET all user success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id_user } = req.params;
    const [data] = await UserModel.getUserById(id_user);

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "GET user by ID success",
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    await UserModel.createNewUser(body);
    res.status(201).json({
      message: "CREATE new user success",
      data: req.body,
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      res.status(400).json({
        message: "Email already exists",
      });
    } else {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message,
      });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await UserModel.loginUser(req, email, password);

    res.status(200).json({
      message: "Login success",
      data: user,
    });
  } catch (error) {
    let errorMessage = "Invalid email or password";

    if (error.message === "User with this email does not exist") {
      errorMessage = "User with this email does not exist";
    } else if (error.message === "Incorrect password") {
      errorMessage = "Incorrect password";
    }

    res.status(400).json({
      message: errorMessage,
    });
  }
};

const updateUserById = async (req, res) => {
  const { id_user } = req.params;
  const { body } = req;

  try {
    await UserModel.updateUserById(body, id_user);
    res.json({
      message: "UPDATE user success",
      data: {
        id_user,
        ...body,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const updateRoleById = async (req, res) => {
  const { id_user } = req.params;
  const { newRole } = req.body;

  try {
    const currentUser = req.user;

    if (currentUser.role !== "Admin") {
      return res.status(403).json({
        message: "Only admins can update user roles",
      });
    }

    await UserModel.updateRoleById(id_user, newRole);
    res.json({
      message: "UPDATE user role success",
      data: {
        id_user,
        newRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { id_user } = req.params;
  try {
      await UserModel.deleteUserById(id_user);
      res.status(200).json({
          message: "DELETE user success",
      });
  } catch (error) {
      res.status(500).json({
          message: "Server Error",
          serverMessage: error.message,
      });
  }
};

const requestPasswordRecovery = async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  try {
    const token = await UserModel.generatePasswordRecoveryToken(email);
    await sendRecoveryEmail(email, token);

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
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      message: "Token and new password are required",
    });
  }

  try {
    await UserModel.resetPassword(token, newPassword);

    res.status(200).json({
      message: "Password has been reset",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    
    let errorMessage = "Internal server error";
    if (error.message === 'Password reset token is invalid or has expired') {
      errorMessage = "Invalid or expired reset token";
    }

    res.status(400).json({
      message: errorMessage,
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createNewUser,
  loginUser,
  updateUserById,
  updateRoleById,
  deleteUserById,
  requestPasswordRecovery,
  resetPassword
};
