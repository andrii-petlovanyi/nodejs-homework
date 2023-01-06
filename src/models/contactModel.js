import mongoose, { SchemaTypes } from "mongoose";
import { emailRegExp, phoneRegExp } from "../helpers/patterns.js";

const contactJoiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter name"],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required. Please enter email"],
      match: [emailRegExp, "Please enter the valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Please enter phone number"],
      unique: true,
      match: [phoneRegExp, "Please enter the valid phone number"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", contactJoiSchema);

export { Contact };
