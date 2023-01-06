import { isValidObjectId } from "mongoose";

import { WrongParamsError } from "../helpers/errors.js";

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(new WrongParamsError("Invalid id format"));
  }
  next();
};

export { isValidId };
