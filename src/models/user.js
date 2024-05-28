const dbPool = require("../config/database")

const getAllUser = () => {
  const SQLQuery = 'SELECT * FROM user';

  return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO user (email, password, nama_depan, nama_belakang, img_profile, role) 
  VALUES ('${body.email}', '${body.password}', '${body.nama_depan}', '${body.nama_belakang}', '${body.img_profile}', '${body.role}')`

  return dbPool.execute(SQLQuery);
}

module.exports = {
  getAllUser,
  createNewUser,
}