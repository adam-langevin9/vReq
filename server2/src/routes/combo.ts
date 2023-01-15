import combo from "../controllers/combo";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve all Combos
  router.get("/", combo.findAll);

  // Retrieve a single Combo with id
  router.get("/:id", combo.findByPk);

  // Retrieve a single Combo with id
  router.get("/:req_id/:start_year", combo.findOne);

  app.use("/api/combo", router);
};
