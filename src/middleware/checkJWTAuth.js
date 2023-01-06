import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { BadCredentials } from "../helpers/errors.js";
import { User } from "../models/userModel.js";

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

const checkJWTAuth = async (req, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(" ") ?? [];
  try {
    if (bearer !== "Bearer") {
      throw new BadCredentials("Not authorized");
    }
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw new BadCredentials("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new BadCredentials(error.message));
  }
};

export { checkJWTAuth };
