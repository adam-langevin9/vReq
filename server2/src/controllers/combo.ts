import db from "../models";
import type { Request, Response } from "express";
import type { ComboAttributes } from "../models/init-models";
const Combo = db.combo;
const Op = db.Sequelize.Op;

export default module.exports = {
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

    // Save Tutorial in the database
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
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Combo.findAll({ where: condition })
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
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    Combo.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Combo with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Combo with id=" + id,
        });
      });
  },

  // Update a Combo by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    Combo.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Combo was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Combo with id=${id}. Maybe Combo was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a Combo with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    Combo.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Combo was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Combo with id=${id}. Maybe Combo was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete Combo with id=" + id,
        });
      });
  },

  // Delete all Combos from the database.
  deleteAll(req: Request, res: Response): void {
    Combo.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} Combos were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all Combos.",
        });
      });
  },
};
