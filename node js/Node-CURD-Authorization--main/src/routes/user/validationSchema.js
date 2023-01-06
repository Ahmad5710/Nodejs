const Joi = require("joi");

const createStudentSchema = (student) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).required(),
    CNIC: Joi.number().min(1000000000000).max(9999999999999).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    Gender: Joi.string().required(),
    DOB: Joi.date().required(),
    cell: Joi.number().required()
  });

  return schema.validate(student);
};

module.exports = createStudentSchema;
