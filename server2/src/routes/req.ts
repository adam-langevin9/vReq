import req from "../controllers/req";
import express from "express";

export default (app: any) => {
  const router = express.Router();

  // Retrieve all Coreqs
  router.get("/", req.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id/:start_year", req.findOne);

  app.use("/api/req", router);
};
