require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");

const app = express();

const userRoutes = require("./routes/user");

const middlewareLogReq = require("./middleware/logs");

app.use(express.json());
app.use(middlewareLogReq);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
