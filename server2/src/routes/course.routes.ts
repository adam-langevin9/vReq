import course from "../controllers/course";
import express from "express";

export default module.exports = (app: any) => {
  const router = express.Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findOne);

  app.use("/api/course", router);
};
