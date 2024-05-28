const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const middlewareLogReq = require("./middleware/logs");

app.use("/user", userRoutes);

app.use(middlewareLogReq);
app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
