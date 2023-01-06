import express from "express";
import logger from "morgan";
import cors from "cors";
import { contactsRouter } from "./routes/api/contacts.js";
import { errorHandler } from "./helpers/errorHandler.js";
import { authRouter } from "./routes/api/users.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "failure", code: 404, message: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

export { app };
