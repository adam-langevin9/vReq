import course from "../controllers/course";
import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findByPK);

  // Retrieve a single Course with listing
  router.get("/:subj/:num", course.findListingCourse);

  app.use("/api/course", router);
};
