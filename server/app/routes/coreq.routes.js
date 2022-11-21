module.exports = (app) => {
  const coreq = require("../controllers/coreq.controller.js");

  var router = require("express").Router();

  // Retrieve all Coreqs
  router.get("/", coreq.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id", coreq.findOne);

  app.use("/api/coreq", router);
};
