import { db } from "../models";
import { Op } from "sequelize";

const Coreq = db.coreq;

// Retrieve all Coreqs from the database.
exports.findAll = (req, res) => {
  const coreq_id = req.query.coreq_id;
  const condition = coreq_id
    ? { coreq_id: { [Op.like]: `%${coreq_id}%` } }
    : null;

  Coreq.findAll({ where: condition })
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

// Find a single Coreq with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Coreq.findByPk(id)
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
