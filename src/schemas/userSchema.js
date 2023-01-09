import Joi from "joi";

import { emailRegExp } from "../helpers/patternsRegExp.js";

const singUpJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please fill a valid email address`,
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
