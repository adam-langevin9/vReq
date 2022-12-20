import db from "../models";
import type { Request, Response } from "express";
import type { CoreqAttributes } from "../models/init-models";
const Coreq = db.Coreq;

export default {
  // Create and Save a new Coreq
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Coreq
    const coreq: CoreqAttributes = {
      id: req.body.id,
      prereq_id: req.body.prereq_id,
      precoreq_id: req.body.precoreq_id,
    };

    // Save Coreq in the database
    Coreq.create(coreq)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Coreq.",
        });
      });
  },

  // Retrieve all Coreqs from the database.
  findAll(req: Request, res: Response): void {
    Coreq.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Coreqs.",
        });
      });
  },

  // Find a single Coreq with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    Coreq.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Coreq with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Coreq with id=" + id,
        });
      });
  },
};
