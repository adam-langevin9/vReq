import user from "../controllers/user";
import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Create a user
  router.put("/", user.create);

  // Verify a user's id
  router.post("/isAvailable", user.isAvailable);

  // Verify a user's pw
  router.post("/verify", user.verify);

  // Retrieve a user's visuals if they input the correct password
  router.post("/", user.login);

  app.use("/api/user", router);
};
