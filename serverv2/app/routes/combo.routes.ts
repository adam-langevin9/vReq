export default module.exports = (app: {
  use: (arg0: string, arg1: any) => void;
}) => {
  const combo = require("../controllers/combo.controller.js");

  const router = require("express").Router();

  // Retrieve all Combos
  router.get("/", combo.findAll);

  // Retrieve a single Combo with id
  router.get("/:id", combo.findOne);

  app.use("/api/combo", router);
};
