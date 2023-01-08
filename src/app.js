import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import { contactsRouter } from "./routes/api/contacts.js";
import { errorHandler } from "./helpers/errorHandler.js";
import { authRouter } from "./routes/api/users.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const pathPublic = path.resolve("./src/public");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(pathPublic));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "failure", code: 404, message: "Not found" });
});

app.use(errorHandler);

export { app };
