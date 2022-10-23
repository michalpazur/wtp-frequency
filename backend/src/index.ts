import dotenv from "dotenv";
import express from "express";
import { stopRouter } from "./routes/stops";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>${new Date()}</h1>`);
});

app.use("/stops", stopRouter);

app.listen(port, () => {
  console.log(`👍 Express.js listening on port ${port}!`);
});
