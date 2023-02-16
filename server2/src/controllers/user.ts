import { Visual } from "../models/init-models";
import type { Request, Response } from "express";
import { create as _create, login as _login } from "../middleware/UserUtilities";
export default {
  // Create and Save a new User
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.params.id) {
      res.status(400).send({
        message: "Username can not be empty.",
      });
      return;
    }
    if (!req.params.pw) {
      res.status(400).send({
        message: "Password can not be empty.",
      });
      return;
    }

    // Save Listing in the database
    _create(req.params.id, req.params.pw)
      .then((result: boolean) => {
        if (result) res.send(result);
        else res.status(500).send({ message: "User already exists." });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
        });
      });
  },

  // Log a single User in with an id and pw
  login(req: Request, res: Response): void {
    const id = req.params.id;
    const pw = req.params.pw;

    if (!id) {
      res.status(400).send({
        message: "Username can not be empty.",
      });
      return;
    }
    if (!pw) {
      res.status(400).send({
        message: "Password can not be empty.",
      });
      return;
    }

    _login(id, pw)
      .then((result: Visual[] | null) => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send({
            message: "Invalid login, please check your username and password.",
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving User " + id,
        });
      });
  },
};
