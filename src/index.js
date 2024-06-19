require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const session = require('express-session');
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware lainnya
const middlewareLogReq = require("./middleware/logs");
const upload = require("./middleware/multer");

// Routes
const userRoutes = require("./routes/user");
const recoveryRoutes = require("./routes/password-recovery");
const contentsRoutes = require("./routes/contents");
const wasteRoutes = require("./routes/waste");
const recyclingRoutes = require("./routes/recycling");
const communityRoutes = require("./routes/community");
// const processImage = require("./middleware/processImage");

// Config
const { secretKey } = require('./config/database');

// Middleware
app.use(express.json());
app.use('/assets',express.static("public/images"));
app.use(express.urlencoded({ extended: true }));

app.use(middlewareLogReq);

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.use("/api/user", upload.single('img_profile'), userRoutes);
app.use("/api/password-recovery", recoveryRoutes);
app.use("/api/contents", upload.single('image'), contentsRoutes);
app.use("/api/waste", upload.single('image'), wasteRoutes);
app.use("/api/recycling", upload.array('image', 5), recyclingRoutes);
app.use("/api/community", upload.single('post_img')||upload.single('comment_img'), communityRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({
    message: "Internal server error",
    serverMessage: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});