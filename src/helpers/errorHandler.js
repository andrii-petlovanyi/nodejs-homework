import { PhoneBookError } from "./errors.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof PhoneBookError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

export { errorHandler };
