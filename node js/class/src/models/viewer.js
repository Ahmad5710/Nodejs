//models

// const { required } = require("joi");
const mongoose = require("mongoose");

const viewerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,

  
});

const Viewer = mongoose.model("Viewers", viewerSchema);

module.exports = Viewer;
