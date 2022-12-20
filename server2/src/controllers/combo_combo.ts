import db from "../models";
import type { Request, Response } from "express";
import type { ComboComboAttributes } from "../models/init-models";
const ComboCombo = db.ComboCombo;

export default {
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

    // Save ComboCombo in the database
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
    ComboCombo.findAll()
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
};
