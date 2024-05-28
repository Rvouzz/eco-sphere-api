const getAllUser = (req, res) => {
  res.json({
    message: "GET all user success"
  })
}

const createNewUser = (req, res) => {
  console.log(req.body);
  res.json({
    message: "CREATE new user success",
    data: req.body
  })
}

module.exports = {
  getAllUser,
  createNewUser,
}