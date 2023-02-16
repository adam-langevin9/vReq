import user from "../controllers/user";
import express, { Express } from "express";

export default async (app: Express): Promise<void> => {
  const router = express.Router();

  // Create a user
  router.get("/create/:id/:pw", user.create);

  // Retrieve a user's visuals if they input the correct password
  router.get("/login/:id/:pw", user.login);

  app.use("/api/user", router);
};
