import db from "../models";
import type { Request, Response } from "express";
import type { ComboCoreqAttributes } from "../models/init-models";
const ComboCoreq = db.comboCoreq;
const Op = db.Sequelize.Op;

export default module.exports = {
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

    // Save Tutorial in the database
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
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    ComboCoreq.findAll({ where: condition })
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

  // Update a ComboCoreq by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCoreq.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "ComboCoreq was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update ComboCoreq with id=${id}. Maybe ComboCoreq was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a ComboCoreq with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCoreq.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "ComboCoreq was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete ComboCoreq with id=${id}. Maybe ComboCoreq was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete ComboCoreq with id=" + id,
        });
      });
  },

  // Delete all ComboCoreqs from the database.
  deleteAll(req: Request, res: Response): void {
    ComboCoreq.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} ComboCoreqs were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all ComboCoreqs.",
        });
      });
  },
};
