const UserModel = require("../models/user");

const getAllUser = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUser();
    res.json({
      message: "GET all user success",
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
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
        success: false,
      });
    }

    res.json({
      message: "GET user by ID success",
      success: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
      serverMessage: error.message,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Assuming the email is passed as a URL parameter
    const [data] = await UserModel.getUserByEmail(email);

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.json({
      message: "GET user by email success",
      success: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
      serverMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  const nama_depan = body.nama_depan !== undefined ? body.nama_depan : null;
  const nama_belakang = body.nama_belakang !== undefined ? body.nama_belakang : null;

  try {
    await UserModel.createNewUser(body, nama_depan, nama_belakang);
    res.status(201).json({
      message: "CREATE new user success",
      success: true,
      data: req.body,
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Server Error",
        success: false,
        serverMessage: error.message,
      });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password, googleid } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
      success: false,
    });
  }

  try {
    const user = await UserModel.loginUser(req, email, password, googleid);

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
    } else if (error.message === "Invalid Google ID") {
      errorMessage = "Invalid Google ID";
    }

    res.status(400).json({
      message: errorMessage,
      success: false,
    });
  }
};

const updateUserById = async (req, res) => {
  const { id_user } = req.params;
  const { body } = req;

  const img_profile = req.file ? req.file.filename : body.img_profile === undefined ? null : body.img_profile;

  try {
    await UserModel.updateUserById(body, id_user, img_profile);
    res.json({
      message: "UPDATE user success",
      success: true,
      data: {
        id_user,
        ...body,
        img_profile,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
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
        success: false,
      });
    }

    await UserModel.updateRoleById(id_user, newRole);
    res.json({
      message: "UPDATE user role success",
      success: true,
      data: {
        id_user,
        newRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
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
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByEmail,
  createNewUser,
  loginUser,
  updateUserById,
  updateRoleById,
  deleteUserById,
};
