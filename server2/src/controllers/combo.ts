import db from "../models";
import type { Request, Response } from "express";
import type { ComboAttributes } from "../models/init-models";
const Combo = db.Combo;

export default {
  // Create and Save a new Combo
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Combo
    const combo: ComboAttributes = {
      id: req.body.id,
      op: req.body.id ? req.body.id : "ONE",
    };

    // Save Combo in the database
    Combo.create(combo)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Combo.",
        });
      });
  },

  // Retrieve all Combos from the database.
  findAll(req: Request, res: Response): void {
    Combo.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Combos.",
        });
      });
  },

  // Find a single Combo with an id
  findByPk(req: Request, res: Response): void {
    const id = +req.params.id;

    Combo.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Combo with id${id} or .`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Combo with id=" + id,
        });
      });
  },

  // Find a single Combo with an id
  findOne(req: Request, res: Response): void {
    const req_id = req.params.req_id;
    const start_year = req.params.start_year;

    Combo.findOne({ where: {} })
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Combo with id=${req_id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Combo with id=" + req_id,
        });
      });
  },
};
