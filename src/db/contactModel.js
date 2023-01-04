import mongoose from "mongoose";
import { emailRegExp, phoneRegExp } from "../helpers/patterns.js";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      match: [emailRegExp, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      require: true,
      unique: true,
      match: [phoneRegExp, "Please fill a valid phone number"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export { Contact };
