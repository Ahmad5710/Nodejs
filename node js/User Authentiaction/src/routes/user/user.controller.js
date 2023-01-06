const express = require("express");
const errorHandler = require("../../middleware/error");
const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const createUserSchema = require("./validationSchema");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(
  "/", (req,res,next)=>{

    if(req.headers.token!== undefined){
      jwt.verify(req.headers.token,'secret', (err, verified)=>{
        if(err){
          res.status(400).send({ message: "token not valid" });
        }else{
          //Check in DB
          next();
        }
      })
      
    }else{
      res.status(400).send({ message: "No token" });
    }
    
  } ,
  errorHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).send(user);
  })
);

router.get(
  "/:userId",
  errorHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });

    res.status(200).send(user);
  })
);


router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createUserSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let user = new User(payload);
  user = await user.save();
  res.status(200).send({ user });
});



router.post("/login",async (req, res) => {
  console.log('heree')
  const user = await User.findOne({ email: req.body.email });
  console.log(user)
  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== user.password) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    username: user.username,
    email: user.email,
  });

  res.status(200).send({ message: "success", token ,user});
});

module.exports = router;