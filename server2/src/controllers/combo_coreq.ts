import db from "../models";
import type { Request, Response } from "express";
import type { ComboCoreqAttributes } from "../models/init-models";
const ComboCoreq = db.ComboCoreq;

export default {
  // Create and Save a new ComboCoreq
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a ComboCoreq
    const comboCoreq: ComboCoreqAttributes = {
      combo_id: req.body.combo_id,
      coreq_id: req.body.coreq_id,
    };

    // Save ComboCoreq in the database
    ComboCoreq.create(comboCoreq)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the ComboCoreq.",
        });
      });
  },

  // Retrieve all ComboCoreqs from the database.
  findAll(req: Request, res: Response): void {
    ComboCoreq.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving ComboCoreqs.",
        });
      });
  },

  // Find a single ComboCoreq with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCoreq.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ComboCoreq with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving ComboCoreq with id=" + id,
        });
      });
  },
};
