import express from "express";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
import db from "./src/models/index";

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
