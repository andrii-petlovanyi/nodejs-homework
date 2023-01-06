import { NotAuthorizedError, ConflictError } from "../helpers/errors.js";
import { generateToken } from "../helpers/generateToken.js";
import { User } from "../models/userModel.js";

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password))
    throw new NotAuthorizedError("Email or password is wrong");

  const token = generateToken(user);

  await User.findByIdAndUpdate(user._id, { token });

  return { token, user };
};

const signUp = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) throw new ConflictError(`User with email ${email} is registered`);

  const newUser = new User({ name, email });
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

export { signIn, signUp, logOut, updateSubscription };
