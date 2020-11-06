const Joi = require('joi');

module.exports = {
  loginValidation(data) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6)
    });
    return schema.validate(data);
  },

  registerValidation(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6)
    });
    return schema.validate(data);
  }
};
