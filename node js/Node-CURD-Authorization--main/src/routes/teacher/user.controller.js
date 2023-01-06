const express = require("express");
const errorHandler = require("../../middleware/error");
const Teacher = require("../../models/Teacher");
const { generateAuthToken } = require("../../utils/helpers");
const createStudentSchema = require("./validationSchema");

const router = express.Router();

router.get(
  "/",
  errorHandler(async (req, res) => {
    const teacher = await Teacher.find();
    res.status(200).send(teacher);
  })
);

router.get(
  "/:userId",
  errorHandler(async (req, res) => {
    const teacher = await Teacher.findOne({ _id: req.params.userId });

    res.status(200).send(teacher);
  })
);



router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createStudentSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  let teacher = new Teacher(payload);

  teacher = await teacher.save();
  res.status(200).send({ teacher });
});

module.exports = router;
