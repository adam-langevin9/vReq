import coreq from "../controllers/coreq";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve all Coreqs
  router.get("/", coreq.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id", coreq.findOne);

  // Retrieve a Coreq's courses and listings by listing
  router.get("/subj/:subj/num/:num", coreq.findByListing);

  app.use("/api/coreq", router);
};
