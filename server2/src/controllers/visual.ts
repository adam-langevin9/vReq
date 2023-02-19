import type { Request, Response } from "express";
import { BaseError, ValidationError } from "sequelize";
import { Visual } from "../models/visual";
export default {
  // Create and Save a new visual
  create(req: Request, res: Response): void {
    const title = req.body.title;
    const user_id = req.body.user_id;
    const start_year = +req.body.start_year;
    const elements = req.body.elements;

    // Validate request
    if (!title) {
      res.status(400).send({
        message: "Invalid Title.",
      });
      return;
    }
    if (!user_id) {
      res.status(400).send({
        message: "Invalid User ID.",
      });
      return;
    }
    if (!start_year) {
      res.status(400).send({
        message: "Invalid Start year.",
      });
      return;
    }
    if (!elements) {
      res.status(400).send({
        message: "Invalid Elements.",
      });
      return;
    }

    // Save Visual in the database
    Visual.create({ title, user_id, start_year, elements })
      .then((visual) => {
        if (visual) res.status(200).send(visual);
        else res.status(500).send({ message: "Some error occurred while creating a visual." });
      })
      .catch((err: BaseError) => {
        if (err instanceof ValidationError) res.status(409).send({ message: "That visual already exists" });
        else
          res.status(500).send({
            message: err.message ?? "Some error occurred while creating a visual.",
          });
      });
  },

  // Read a single visual with an id
  read(req: Request, res: Response): void {
    const id = +req.body.id;
    if (!id) {
      res.status(400).send({
        message: "Invalid ID.",
      });
      return;
    }

    Visual.findByPk(id)
      .then((visual) => {
        if (visual) res.status(200).send(visual);
        else res.status(404).send({ message: "Visual not found" });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving a visual.",
        });
      });
  },

  // Update a visual by the id in the request
  async update(req: Request, res: Response): Promise<void> {
    const id = +req.body.id;
    const title = req.body.title;
    const user_id = req.body.user_id;
    const start_year = +req.body.start_year;
    const elements = req.body.elements;

    // Validate request
    if (!id) {
      res.status(400).send({
        message: "Invalid ID.",
      });
      return;
    }

    const newData: object = {
      ...(title && { title }),
      ...(user_id && { user_id }),
      ...(start_year && { start_year }),
      ...(elements && { elements }),
    };
    Visual.update(newData, { where: { id } })
      .then(([affectedCount]) => {
        res.status(200).send(affectedCount.toString());
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while updating a visual.",
        });
      });
  },

  // Delete a visual with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = +req.body.id;

    if (!id) {
      res.status(400).send({
        message: "Invalid ID.",
      });
      return;
    }

    Visual.destroy({ where: { id } })
      .then((affectedCount) => {
        if (affectedCount > 0) res.status(200).send();
        else res.status(404).send({ message: "Visual not found." });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the User.",
        });
      });
  },
};
