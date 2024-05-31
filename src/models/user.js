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

const createNewUser = async (body) => {
  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  const [existingUser] = await dbPool.execute(checkEmailQuery, [body.email]);

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const SQLQuery = `INSERT INTO user (email, password) 
  VALUES (?, ?)`;

  const userValues = [body.email, hashedPassword];
  return dbPool.execute(SQLQuery, userValues);
};

const loginUser = async (req, email, password) => {
  try {
    console.log("Starting login process");

    const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
    const [users] = await dbPool.execute(checkEmailQuery, [email]);

    console.log("Query executed. Users found:", users.length);

    if (users.length === 0) {
      console.error("User with this email does not exist");
      throw new Error("Invalid email or password");
    }

    const user = users[0];
    console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error("Incorrect password");
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    req.session.user = userWithoutPassword;

    console.log("Login successful");

    return {
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Error occurred during login:", error.message);
    throw error;
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createNewUser,
  loginUser,
};
