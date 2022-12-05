import coreq from "../controllers/coreq";
import express from "express";

export default module.exports = (app: any) => {
  const router = express.Router();

  // Retrieve all Coreqs
  router.get("/", coreq.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id", coreq.findOne);

  app.use("/api/coreq", router);
};
