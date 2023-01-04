import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URL } = process.env;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(MONGO_URL);
};

export { connectMongo };
