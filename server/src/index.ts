import db from "./models/index";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.OUT_PORT ?? 3000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
