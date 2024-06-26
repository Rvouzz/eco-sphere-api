const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dbPool, secretKey } = require("../config/database");

const getAllUser = () => {
  const SQLQuery = "SELECT * FROM user";
  return dbPool.execute(SQLQuery);
};

const getUserById = (id_user) => {
  const SQLQuery = "SELECT * FROM user WHERE id_user = ?";
  return dbPool.execute(SQLQuery, [id_user]);
};

const getUserByEmail = (email) => {
  const SQLQuery = "SELECT * FROM user WHERE email = ?";
  return dbPool.execute(SQLQuery, [email]);
};

const createNewUser = async (body, nama_depan, nama_belakang) => {
  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  const [existingUser] = await dbPool.execute(checkEmailQuery, [body.email]);

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }

  if (body.googleid) {
    const SQLQuery = `INSERT INTO user (email, nama_depan, nama_belakang, img_profile, googleid, role) 
                      VALUES (?, ?, ?, ?, ?, ?)`;
    const userValues = [
      body.email || null, 
      nama_depan || null, 
      nama_belakang || null, 
      body.img_profile || null, 
      body.googleid || null,
      'User' // default role
    ];
    return dbPool.execute(SQLQuery, userValues);
  } else {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const SQLQuery = `INSERT INTO user (email, password, nama_depan, nama_belakang, googleid, role) 
                      VALUES (?, ?, ?, ?, ?, ?)`;
    const userValues = [
      body.email || null, 
      hashedPassword, 
      nama_depan || null, 
      nama_belakang || null,
      null,
      'User'
    ];
    return dbPool.execute(SQLQuery, userValues);
  }
};


const loginUser = async (req, email, password = null, googleid = null) => {
  try {
    const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
    const [users] = await dbPool.execute(checkEmailQuery, [email]);

    if (users.length === 0) {
      throw new Error("User with this email does not exist");
    }

    const user = users[0];

    if (googleid) {
      if (user.googleid !== googleid) {
        throw new Error("Invalid Google ID");
      }
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    req.session.user = userWithoutPassword;

    return {
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login successful",
    };
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (body, id_user, img_profile) => {
  const { nama_depan, nama_belakang, role, password } = body;

  let SQLQuery;
  let userValues;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    SQLQuery = "UPDATE user SET nama_depan = ?, nama_belakang = ?, password = ?, img_profile = ?, role =? WHERE id_user = ?";
    userValues = [nama_depan, nama_belakang, hashedPassword, img_profile, role, id_user];
  } else {
    SQLQuery = "UPDATE user SET nama_depan = ?, nama_belakang = ?, img_profile = ?, role =? WHERE id_user = ?";
    userValues = [nama_depan, nama_belakang, img_profile, role, id_user];
  }
  console.log(SQLQuery, userValues);
  return dbPool.execute(SQLQuery, userValues);
};

const deleteUserById = async (id_user) => {
  const deleteQuery = "DELETE FROM user WHERE id_user = ?";
  return dbPool.execute(deleteQuery, [id_user]);
};

const updateRoleById = async (id_user, newRole) => {
  const checkAdminQuery =
    "SELECT * FROM user WHERE id_user = ? AND role = 'Admin'";
  const [Admin] = await dbPool.execute(checkAdminQuery, [id_user]);

  if (Admin.length === 0) {
    throw new Error("Only admins can update user roles");
  }

  const updateQuery = "UPDATE user SET role = ? WHERE id_user = ?";
  const updateValues = [newRole, id_user];

  return dbPool.execute(updateQuery, updateValues);
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByEmail,
  createNewUser,
  loginUser,
  updateUserById,
  deleteUserById,
  updateRoleById,
};