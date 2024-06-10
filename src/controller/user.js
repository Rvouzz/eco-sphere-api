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
  const img_profile = req.file
    ? req.file.buffer
    : body.img_profile === undefined
    ? null
    : body.img_profile;

  try {
    await UserModel.updateUserById(body, id_user, img_profile);
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

module.exports = {
  getAllUser,
  getUserById,
  createNewUser,
  loginUser,
  updateUserById,
  updateRoleById,
  deleteUserById,
};
