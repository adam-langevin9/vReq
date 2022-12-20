import bodyParser from "body-parser";
import cors from "cors";
import courseRoute from "./routes/course";
import reqRoute from "./routes/req";
import comboRoute from "./routes/combo";
import db from "./models/index";
import * as dotenv from "dotenv";
import express from "express";

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
courseRoute(app);
reqRoute(app);
comboRoute(app);

dotenv.config();
const port = process.env.OUT_PORT ?? 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

db.sequelize
  .sync()
  .then((result: any) => {
    console.log(result);
  })
  .catch((err: Error) => console.log(err));
