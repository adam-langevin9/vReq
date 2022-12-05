import db from "../models";
import type { Request, Response } from "express";
import type { ReqAttributes } from "../models/init-models";
const Req = db.req;
const Op = db.Sequelize.Op;

export default module.exports = {
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
      req_string: req.body.req_string,
    };

    // Save Tutorial in the database
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
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Req.findAll({ where: condition })
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

    Req.findByPk(id)
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

  // Update a Req by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    Req.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Req was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Req with id=${id}. Maybe Req was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a Req with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    Req.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Req was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Req with id=${id}. Maybe Req was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete Req with id=" + id,
        });
      });
  },

  // Delete all Reqs from the database.
  deleteAll(req: Request, res: Response): void {
    Req.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} Reqs were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all Reqs.",
        });
      });
  },
};
