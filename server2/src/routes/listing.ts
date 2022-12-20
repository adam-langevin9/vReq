import listing from "../controllers/listing";
import express from "express";

export default (app: any) => {
  const router = express.Router();

  // Retrieve all Listings
  router.get("/", listing.findAll);

  // Retrieve a single Listing with id
  router.get("/:id", listing.findOne);

  app.use("/api/listing", router);
};
