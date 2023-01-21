import coreq from "../controllers/coreq";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get("/subj/:subj/num/:num", coreq.findDetailedCoreq);

  app.use("/api/coreq", router);
};
