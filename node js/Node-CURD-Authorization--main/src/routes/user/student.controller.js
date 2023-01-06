const express = require("express");
const errorHandler = require("../../middleware/error");
const Student = require("../../models/Student");
const { generateAuthToken } = require("../../utils/helpers");
const createStudentSchema = require("./validationSchema");

const router = express.Router();

router.get(
  "/",
  errorHandler(async (req, res) => {
    const student = await Student.find();
    res.status(200).send(student);
  })
);

router.get(
  "/:userId",
  errorHandler(async (req, res) => {
    const student = await Student.findOne({ _id: req.params.userId });

    res.status(200).send(student);
  })
);


router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createStudentSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let student = new Student(payload);

  student = await student.save();
  res.status(200).send({ student });
});



router.post("/login", async (req, res) => {
  console.log('heree')
  const student = await Student.findOne({ email: req.body.email });
  console.log(student)
  if (!student) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (req.body.password !== student.password) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    username: student.username,
    email: student.email,
  });

  res.status(200).send({ message: "success", token });
});

module.exports = router;