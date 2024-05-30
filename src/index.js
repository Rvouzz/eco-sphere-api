require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const middlewareLogReq = require("./middleware/logs");
const contentsRoutes = require("./routes/contents");
const wasteRoutes = require("./routes/waste");
const recyclingRoutes = require("./routes/recycling");
const cors = require("cors");
const upload = require("./middleware/multer");

app.use(express.json());
app.use(cors());
app.use(middlewareLogReq);
app.use("/user", userRoutes);
app.use("/api/contents", upload.single('image'), contentsRoutes);
app.use("/api/waste", upload.single('image'), wasteRoutes);
app.use("/api/recycling", upload.single('image'), recyclingRoutes);


app.use((err, req, res, next) => {
  res.status(500).send({
      message: "Internal server error",
      serverMessage: err.message

  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
