import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5005;
const { MONGO_URL } = process.env;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(MONGO_URL);
};

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(PORT, (error) => {
      if (error) console.error("Error at server launch: ", error);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("\x1B[31mDatabase connection failed");
    process.exit(1);
  }
};

start();
