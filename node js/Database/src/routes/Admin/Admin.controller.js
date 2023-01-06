const express = require("express");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../middleware/error");
const Admin = require("../../models/Admin");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");
const authHandler = require("../../middleware/auth");

const router= express.Router();


// create a login route

router.post("/adminlogin",async (req, res) => {
  const admin = await Admin.findOne({ name: req.body.name });
  if (!admin) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== admin.password) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    name: admin.name,
    id: admin._id,
  });
  res.status(200).send({ message: "success",token,admin });
});


//logout

router.post("/adminlogout", function (req, res) {
  const authHeader = req.headers.token;
    
  console.log(authHeader)
  jwt.verify(authHeader,  "kdjsaiwqiksdnsk",  { expiresIn: 1} , (err, verfied) => {
  if (verfied) {
  res.send({msg : 'You have been Logged Out' });
  } else {
  res.send({msg:'Error'});
  }
  });
  });



module.exports = router;
