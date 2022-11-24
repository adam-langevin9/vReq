export default module.exports = (app: {
  use: (arg0: string, arg1: any) => void;
}) => {
  const coreq = require("../controllers/coreq.controller.js");

  const router = require("express").Router();

  // Retrieve all Coreqs
  router.get("/", coreq.findAll);

  // Retrieve a single Coreq with id
  router.get("/:id", coreq.findOne);

  app.use("/api/coreq", router);
};
