import { connectMongo } from "./db/connection.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5005;

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
