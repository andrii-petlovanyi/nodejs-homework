import { ValidationError } from "../helpers/errors.js";

const reqValidation = (schema) => {
  const func = async (req, res, next) => {
    const body = req.body;

    if (!Object.keys(body).length) {
      next(new ValidationError("All fields is required"));
    }

    const { error } = schema.validate(body);

    if (error) {
      next(new ValidationError(error.message));
    }

    next();
  };

  return func;
};

export { reqValidation };
