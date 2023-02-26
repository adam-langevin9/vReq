import listing from "../controllers/listing";

import express, { Express } from "express";

export default (app: Express): void => {
  const router = express.Router();

  // Retrieve a Coreq's courses and listings by listing
  router.get("/valid", listing.validListing);

  app.use("/api/listing", router);
};
