import express from "express";
import { config as dotenv } from "dotenv";
import logger from "morgan";
import helmet from "helmet";
import { prisma } from "./config/prisma-client.js";

const app = express();

dotenv();
const { NODE_ENV, PORT } = process.env;

if (NODE_ENV !== "production") {
  app.use(logger("dev"));
}

app.use(helmet());

app.get("/", async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        username: "test",
      },
    })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

const listener = app.listen(PORT || 3000, () => {
  console.log(
    `Listening on http://localhost:${listener.address().port}/ (${NODE_ENV})`
  );
});
