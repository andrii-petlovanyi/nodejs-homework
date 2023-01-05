import Joi from "joi";
import { emailRegExp, phoneRegExp } from "../helpers/patterns.js";

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegExp)
    .required()
    .messages({
      "string.pattern.base": `Please fill a valid email`,
    }),
  phone: Joi.string().min(10).max(16).pattern(phoneRegExp).required().messages({
    "string.pattern.base": `Please fill a valid phone number`,
  }),
  favorite: Joi.boolean(),
});

export { contactSchema };
