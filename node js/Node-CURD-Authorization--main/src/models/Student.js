//models

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  password: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
