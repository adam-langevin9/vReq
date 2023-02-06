import flow from "../controllers/flow";

import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get("/:subj/:num/:startYear", flow.findFlow);

  app.use("/api/flow", router);
};
