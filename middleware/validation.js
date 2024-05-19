const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    source: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "linkUrl" field must be filled in',
      "string.uri": 'the "linkUrl" field must be a valid url',
    }),

    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .required()
      .messages({ "string.empty": 'The "password" field must be filled in' }),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .required()
      .messages({ "string.empty": 'The "password" field must be filled in' }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    ArticleId: Joi.string()
      .length(24)
      .regex(/^[A-Fa-f0-9]{24}$/)
      .messages({
        "string.length": `The "id" field is not a valid length`,
      }),
  }),
});
