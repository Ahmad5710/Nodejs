const express = require("express");
const mongoose = require("mongoose");
const authHandler = require("./middleware/auth");
const User = require("./models/user");
const router = require("./routes/user/user.controller");
const app = express();
app.use(express.json());
// app.use(authHandler);

mongoose
  .connect("mongodb://localhost:27017/newDb2")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

app.use("/user", router);


app.listen(3000, () => console.log("App is listening at port 3000"));