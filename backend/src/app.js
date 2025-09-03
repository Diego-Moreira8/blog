import express from "express";
import { config as dotenv } from "dotenv";
import logger from "morgan";
import helmet from "helmet";

const app = express();

dotenv();
const { NODE_ENV, PORT } = process.env;

if (NODE_ENV !== "production") {
  app.use(logger("dev"));
}

app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

const listener = app.listen(PORT || 3000, () => {
  console.log(
    `Listening on http://localhost:${listener.address().port}/ (${NODE_ENV})`
  );
});
