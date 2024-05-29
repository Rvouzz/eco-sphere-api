require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const middlewareLogReq = require("./middleware/logs");
const contentsRoutes = require("./routes/contents");
const wasteRoutes = require("./routes/waste");
const recyclingRoutes = require("./routes/recycling");

app.use(express.json());
app.use(middlewareLogReq);
app.use("/user", userRoutes);
app.use("/api/contents", contentsRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/recycling", recyclingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
