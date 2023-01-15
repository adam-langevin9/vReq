import coreq from "../controllers/coreq";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve all Coreqs
  router.get("/", coreq.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id", coreq.findOne);

  app.use("/api/coreq", router);
};
