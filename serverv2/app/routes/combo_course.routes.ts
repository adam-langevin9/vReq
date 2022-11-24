export default module.exports = (app: {
  use: (arg0: string, arg1: any) => void;
}) => {
  const combo_course = require("../controllers/combo_course.controller.js");

  const router = require("express").Router();

  // Retrieve all Combos
  router.get("/", combo_course.findAll);

  // Retrieve a single Combo with id
  router.get("/:id", combo_course.findOne);

  app.use("/api/combo_course", router);
};
