export default module.exports = (app: {
  use: (arg0: string, arg1: any) => void;
}) => {
  const listing = require("../controllers/listing.controller.js");

  const router = require("express").Router();

  // Retrieve all Listings
  router.get("/", listing.findAll);

  // Retrieve a single Listing with id
  router.get("/:id", listing.findOne);

  app.use("/api/listing", router);
};
