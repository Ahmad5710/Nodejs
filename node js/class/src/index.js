const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const authHandler = require("./middleware/auth");
const router = require("./routes/user/user.controller");
const routerAdmin = require("./routes/Admin/Admin.controller");
const routerviewer = require("./routes/viewer/viewer.controller")


const app = express();
app.use(cors())
app.use(express.json());
// app.use(authHandler);

mongoose
  .connect("mongodb://localhost:27017/bootcamp1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

app.use("/users", router);
app.use("/admin", routerAdmin);
app.use("/viewer" ,routerviewer)



app.listen(5000, () => console.log("App is listening at port 5000"));
