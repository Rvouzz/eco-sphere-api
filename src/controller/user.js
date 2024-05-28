const UserModel = require("../models/user");

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
    const user = await UserModel.loginUser(email, password);

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

module.exports = {
  getAllUser,
  createNewUser,
  loginUser,
};
