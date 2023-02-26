import visual from "../controllers/visual";
import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Create a visual
  router.put("/", visual.create);

  // Read visual(s)
  router.post("/", visual.read);
  router.post("/titles", visual.readTitles);

  // Update a visual
  router.patch("/", visual.update);

  // Delete a visual
  router.delete("/", visual.delete);

  app.use("/api/visual", router);
};
