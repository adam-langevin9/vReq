export default module.exports = (app: {
  use: (arg0: string, arg1: any) => void;
}) => {
  const course = require("../controllers/course.controller.js");

  const router = require("express").Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findOne);

  app.use("/api/course", router);
};
