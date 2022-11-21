module.exports = (app) => {
  const course = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Retrieve all Course
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findOne);

  app.use("/api/course", router);
};
