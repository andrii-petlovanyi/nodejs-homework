import Joi from "joi";

import { emailRegExp } from "../helpers/index.js";

const singUpJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.max":
      "Name length must be less than or equal to {{#limit}} characters long",
    "string.min":
      "Name length must be at least {{#limit}} characters long",
  }),
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please enter a valid email address`,
  }),
  password: Joi.string().min(6).required(),
});

const singInJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please enter a valid email address`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `Password length must be at least 6 characters long`,
  }),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verificationEmailJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please enter a valid email address`,
  }),
});

export {
  singInJoiSchema,
  singUpJoiSchema,
  subscriptionJoiSchema,
  verificationEmailJoiSchema,
};
