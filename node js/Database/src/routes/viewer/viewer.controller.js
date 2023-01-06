const express = require("express");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../middleware/error");
// const User = require("../../models/user");
const { generateAuthToken } = require("../../utils/helpers");
const createViewerSchema = require("./validationSchema");
const authHandler = require("../../middleware/auth");
const Viewer = require("../../models/viewer")
const {FormateViewerObj} = require("./ViewerFormatter")

const router = express.Router();


// create a get route 

router.get(
  "/",authHandler,
  errorHandler(async (req, res) => {
    if(req.params.limit !== undefined){
      const limit = req.params.limit;
      const skip = req.params.skip

      const viewer = await Viewer.find().limit(limit).skip(skip).sort();
      res.status(200).send(viewer)

    }else{
      const viewer = await Viewer.find()
      res.status(200).send(viewer)
    }
    

    
    // viewer.map((a)=>{
    //   const UserObj = FormateViewerObj(a);
    //   res.status(200).send({
    //     status: true,
    //     message: "user found successfully",
    //     data: UserObj,
    //   });


    // })

    
  })
);

// create a get one by id route 

router.get(
  "/:viewerId",authHandler,
  errorHandler(async (req, res) => {
    const viewer = await Viewer.findOne({ _id: req.params.viewerId });

    const ViewerObj = FormateViewerObj(viewer);
    res.status(200).send({
      status: true,
      message: "user found successfully",
      data: ViewerObj,
    });

   
  })
);






// create a login route

router.post("/login",async (req, res) => {
  const viewer = await Viewer.findOne({ email: req.body.email });
  if (!viewer) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== viewer.password) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    username: viewer.username,
    email: viewer.email,
    id: viewer._id,
  });
  res.status(200).send({ message: "success", token ,viewer });
});



router.post("/signup", async (req, res) => {
  const payload = req.body;

  const { error } = Viewer(payload);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let viewer = new Viewer(payload);
  viewer = await viewer.save();
  res.status(200).send({ viewer });
});



router.post("/",authHandler, async (req, res) => {
  const payload = req.body;
  const { error } = createViewerSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let viewer = new Viewer(payload);

  viewer = await viewer.save();
  res.status(200).send({ viewer });
});

//update the user
router.patch('/:viewerId',authHandler, async (req,res) => {
  const updatedviewer = await Viewer.findByIdAndUpdate(req.params.viewerId,req.body,{
      new : true,
      runValidators : true
    })
  try{
      res.status(200).json({
          status : 'Success',
          data : {
            updatedviewer
          }
        })
  }catch(err){
      console.log(err)
  }
})




//delete a user
// now create a delete route

router.delete("/:viewerId",authHandler, async (req, res) => {
  const id = req.params.viewerId;
  await Viewer.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

//logout

router.put("/logout", function (req, res) {
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
