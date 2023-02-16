import flow from "../controllers/flow";

import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get("/:subj/:num/:startYear", flow.findListingFlow);
  router.get("/:degree_id/:startYear", flow.findDegreeFlow);

  app.use("/api/flow", router);
};
