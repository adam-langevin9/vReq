module.exports = (app) => {
  const combo_combo = require("../controllers/combo_combo.controller.js");

  var router = require("express").Router();

  // Retrieve all Combos
  router.get("/", combo_combo.findAll);

  // Retrieve a single Combo with id
  router.get("/:id", combo_combo.findOne);

  app.use("/api/combo_combo", router);
};
