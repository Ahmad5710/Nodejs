const Joi = require("joi");

const createAdminSchema = (admin) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).required(),
     password: Joi.string().required(),
   
  });

  return schema.validate(admin);
};

module.exports = createAdminSchema;