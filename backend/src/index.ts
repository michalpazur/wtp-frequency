import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import https from "https";
import { shapesRouter } from "./routes/shapes";
import { stopRouter } from "./routes/stops";
import { logger } from "./util/logger";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);
app.use(logger);

app.use("/stops", stopRouter);
app.use("/shapes", shapesRouter);

if (process.env.NODE_ENV === "production") {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, () => {
      console.log(`👍 Express.js listening on port ${port}!`);
    });
} else {
  app.listen(port, () => {
    console.log(`👍 Express.js listening on port ${port}!`);
  });
}
