import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .min(10)
    .max(13)
    .pattern(/^[0-9]+$/)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .min(10)
    .max(13)
    .pattern(/^[0-9]+$/),
});

export { addSchema, updateSchema };
