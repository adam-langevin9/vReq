import degree from "../controllers/degree";

import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  router.get("/", degree.findAll);

  app.use("/api/degree", router);
};
