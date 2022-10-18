import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>${new Date()}</h1>`);
});

app.listen(port, () => {
  console.log(`👍 Express.js listening on port ${port}!`);
});
