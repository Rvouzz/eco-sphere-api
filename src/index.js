require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const session = require('express-session');
const cors = require("cors");

const app = express();

// Middleware lainnya
const middlewareLogReq = require("./middleware/logs");
const upload = require("./middleware/multer");

// Routes
const userRoutes = require("./routes/user");
const contentsRoutes = require("./routes/contents");
const wasteRoutes = require("./routes/waste");
const recyclingRoutes = require("./routes/recycling");

// Config
const { secretKey } = require('./config/database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(middlewareLogReq);

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/contents", upload.single('image'), contentsRoutes);
app.use("/api/waste", upload.single('image'), wasteRoutes);
app.use("/api/recycling", upload.single('image'), recyclingRoutes);

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
