// Imports *********************************************************************
// Packages
import express from "express";
import { config as dotenv } from "dotenv";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
// Modules
import { authenticate, initPassport } from "./config/passport.js";
// Routes
import { authRouter } from "./routes/auth.js";

// App Configuration ***********************************************************
dotenv();
const { NODE_ENV, PORT } = process.env;

initPassport();

const app = express();

if (NODE_ENV !== "production") app.use(logger("dev"));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded());

// Routes **********************************************************************
app.use("/auth", authRouter);

app.get("/", authenticate, (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Resource not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error Handler ***************************************************************
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

// Listener ********************************************************************
const listener = app.listen(PORT || 3000, () => {
  console.log(
    `Listening on http://localhost:${listener.address().port}/ (${NODE_ENV})`
  );
});
