module.exports = (app) => {
  const combo = require("../controllers/combo.controller.js");

  var router = require("express").Router();

  // Retrieve all Combos
  router.get("/", combo.findAll);

  // Retrieve a single Combo with id
  router.get("/:id", combo.findOne);

  app.use("/api/combo", router);
};
