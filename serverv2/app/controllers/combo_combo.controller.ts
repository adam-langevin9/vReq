import { db } from "../models";
import { Op } from "sequelize";

const ComboCombo = db.combo_combo;

// Retrieve all Combos from the database.
exports.findAll = (
  req: { query: { combo_combo_id: any } },
  res: {
    send: (arg0: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
  }
) => {
  const combo_combo_id = req.query.combo_combo_id;
  const condition = combo_combo_id
    ? { combo_combo_id: { [Op.like]: `%${combo_combo_id}%` } }
    : null;

  ComboCombo.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Combo with an id
exports.findOne = (
  req: { params: { id: any } },
  res: {
    send: (arg0: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: string }): void; new (): any };
    };
  }
) => {
  const id = req.params.id;

  ComboCombo.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
