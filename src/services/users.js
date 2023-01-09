import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import {
  NotAuthorizedError,
  ConflictError,
  ValidationError,
} from "../helpers/errors.js";
import { generateToken } from "../helpers/generateToken.js";
import { User } from "../models/userModel.js";

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password))
    throw new NotAuthorizedError("Email or password is wrong");

  const token = generateToken(user);

  await User.findByIdAndUpdate(user._id, { token });
  return { user, token };
};

const signUp = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) throw new ConflictError(`User with email ${email} is registered`);

  const avatarURL = gravatar.url(email, { protocol: "https" });

  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);

  await newUser.save();
  return newUser;
};

const logOut = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) throw new NotAuthorizedError("Not authorized");

  return;
};

const updateSubscription = async (id, body) => {
  const data = await User.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  return data;
};

const updateAvatar = async (id, file) => {
  if (!file) {
    throw new ValidationError("Avatar is required");
  }

  const { path: tempPath, originalname } = file;
  const newName = `${id}_${originalname}`;
  const avatarsDir = path.resolve("./src/public/avatars");

  try {
    const resultPath = path.join(avatarsDir, newName);

    await Jimp.read(tempPath)
      .then((avatar) => {
        return avatar.resize(250, 250).write(resultPath);
      })
      .catch((err) => {
        throw err;
      });

    const avatarURL = path.join("avatars", newName);

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { avatarURL },
      {
        new: true,
      }
    );
    return updatedUser.avatarURL;
  } catch (error) {
    throw new ValidationError(error.message);
  } finally {
    await fs.unlink(tempPath);
  }
};

export { signIn, signUp, logOut, updateSubscription, updateAvatar };
