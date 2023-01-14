import Joi from "joi";

import { emailRegExp, phoneRegExp } from "../../helpers/patternsRegExp.js";

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.max":
      "Name length must be less than or equal to {{#limit}} characters long",
    "string.min": "Name length must be at least {{#limit}} characters long",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegExp)
    .required()
    .messages({
      "string.pattern.base": `Please enter a valid email`,
    }),
  phone: Joi.string().min(10).max(16).pattern(phoneRegExp).required().messages({
    "string.pattern.base": `Please fill a valid phone number`,
  }),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export { contactSchema, favoriteSchema };
