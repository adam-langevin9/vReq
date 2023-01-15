import req from "../controllers/req";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve all Coreqs
  router.get("/", req.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id/:start_year", req.findOne);

  app.use("/api/req", router);
};
