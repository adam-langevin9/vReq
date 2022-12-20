import course from "../controllers/course";
import express from "express";

export default (app: any) => {
  const router = express.Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findByPK);

  // Retrieve a single Course with listing
  router.get("/:subj/:num", course.findByListing);

  app.use("/api/course", router);
};
