//models

// const { required } = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: String,

  
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
