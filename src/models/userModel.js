import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import { emailRegExp } from "../helpers/index.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    password: {
      type: String,
      required: [true, "Password is required! Please set password for user"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required! Please enter email"],
      match: [emailRegExp, "Please enter the valid email address"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: String,
    token: { type: String, default: null },
    verificationToken: {
      type: String,
      require: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
export { User };
