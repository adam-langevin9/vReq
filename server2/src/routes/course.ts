import course from "../controllers/course";
import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findByPK);

  // Retrieve a single Course with listing
  router.get("/subj/:subj/num/:num", course.findByListing);

  app.use("/api/course", router);
};
