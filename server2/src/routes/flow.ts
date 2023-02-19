import flow from "../controllers/flow";

import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get("/", (req, res) => {
    if (req.query.subj && req.query.num && +req.query.num) flow.findListingFlow(req, res);
    else if (req.query.degreeId) flow.findDegreeFlow(req, res);
    else res.status(400).send({ message: "Invalid query parameters." });
  });

  app.use("/api/flow", router);
};
