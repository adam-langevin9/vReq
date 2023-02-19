import course from "../controllers/course";
import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Retrieve a Course(s)
  router.get("/", (req, res) => {
    if (req.query.subj && req.query.num && +req.query.num) course.findListingCourse(req, res);
    else if (req.query.id && +req.query.id) course.findByPK(req, res);
    else course.findAll(req, res);
  });

  app.use("/api/course", router);
};
