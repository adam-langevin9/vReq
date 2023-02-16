import { Req, ReqAttributes } from "../models/init-models";
import type { Request, Response } from "express";
export default {
  // Create and Save a new Req
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Req
    const _req: ReqAttributes = {
      id: req.body.id,
      start_year: req.body.start_year,
      combo_id: req.body.combo_id,
    };

    // Save Req in the database
    Req.create(_req)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Req.",
        });
      });
  },

  // Retrieve all Reqs from the database.
  findAll(req: Request, res: Response): void {
    Req.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Reqs.",
        });
      });
  },

  // Find a single Req with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;
    const start_year = req.params.start_year;

    Req.findOne({ where: { id, start_year } })
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Req with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Req with id=" + id,
        });
      });
  },
};
