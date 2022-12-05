import db from "../models";
import type { Request, Response } from "express";
import type { ComboComboAttributes } from "../models/init-models";
const ComboCombo = db.comboCombo;
const Op = db.Sequelize.Op;

export default module.exports = {
  // Create and Save a new ComboCombo
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a ComboCombo
    const comboCombo: ComboComboAttributes = {
      combo_id: req.body.combo_id,
      sub_combo_id: req.body.sub_combo_id,
    };

    // Save Tutorial in the database
    ComboCombo.create(comboCombo)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the ComboCombo.",
        });
      });
  },

  // Retrieve all ComboCombos from the database.
  findAll(req: Request, res: Response): void {
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    ComboCombo.findAll({ where: condition })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving ComboCombos.",
        });
      });
  },

  // Find a single ComboCombo with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCombo.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ComboCombo with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving ComboCombo with id=" + id,
        });
      });
  },

  // Update a ComboCombo by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCombo.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "ComboCombo was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update ComboCombo with id=${id}. Maybe ComboCombo was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a ComboCombo with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    ComboCombo.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "ComboCombo was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete ComboCombo with id=${id}. Maybe ComboCombo was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete ComboCombo with id=" + id,
        });
      });
  },

  // Delete all ComboCombos from the database.
  deleteAll(req: Request, res: Response): void {
    ComboCombo.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} ComboCombos were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all ComboCombos.",
        });
      });
  },
};
