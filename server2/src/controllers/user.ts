import type { Request, Response } from "express";
import { User, Visual } from "../models/init-models";
export default {
  // Create and Save a new User
  create(req: Request, res: Response): void {
    const id = req.body.id;
    const pw = req.body.pw;
    console.log(id);
    console.log(req.body);
    // Validate request
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

    // Save User in the database
    User.create({ id, pw })
      .then((user) => {
        if (user) res.status(201).send(user);
        else res.status(409).send({ message: "User already exists." });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a user.",
        });
      });
  },

  // Log a single User in with an id and pw
  login(req: Request, res: Response): void {
    const id = req.body.id;
    const pw = req.body.pw;

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

    User.findByPk(id, { include: [{ model: Visual, as: "visuals" }] }).then((user) => {
      if (user) {
        if (user.pw === pw) res.status(200).send({ id: user.id, visuals: user.visuals });
        else res.status(401).send({ message: "Invalid login, please check your password and try again." });
      } else {
        // User does not exist in the database
        res.status(401).send({ message: "Invalid login, please check your username and try again." });
      }
    });
  },
};
