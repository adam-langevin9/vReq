export default module.exports = (app) => {
  const listing = require("../controllers/listing.controller.js");

  var router = require("express").Router();

  // Retrieve all Listings
  router.get("/", listing.findAll);

  // Retrieve a single Listing with id
  router.get("/:id", listing.findOne);

  app.use("/api/listing", router);
};
