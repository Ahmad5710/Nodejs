//models

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
  },
  Gender:{
    type: String,
    required: true,

  },
  DOB:{
    type:Date,
    required: true,
  },
  password: String,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
