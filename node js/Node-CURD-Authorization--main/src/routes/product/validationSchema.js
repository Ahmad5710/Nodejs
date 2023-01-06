const Joi = require("joi");

const createProductSchema = (product) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(8).required(),
    price: Joi.number().min(100000).max(9999999).required(),
    Description: Joi.string().email().required()
  });

  return schema.validate(product);
};

module.exports = createProductSchema;
