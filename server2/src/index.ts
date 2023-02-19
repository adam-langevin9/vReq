import bodyParser from "body-parser";
import cors from "cors";
import courseRoute from "./routes/course";
import flowRoute from "./routes/flow";
import degreeRoute from "./routes/degree";
import userRoute from "./routes/user";
import visualRoute from "./routes/visual";

import db from "./models";
import * as dotenv from "dotenv";
import express from "express";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
courseRoute(app);
flowRoute(app);
degreeRoute(app);
userRoute(app);
visualRoute(app);

dotenv.config();
const port = process.env.OUT_PORT ?? 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

db.sequelize
  .sync()
  .then((result: any) => {
    console.log(`Database connected...`);
  })
  .catch((err: Error) => console.log(err));
