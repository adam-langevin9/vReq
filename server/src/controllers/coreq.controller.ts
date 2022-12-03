import db from "../models";
import type { Request, Response } from "express";
import type { CoreqAttributes } from "../models/init-models";
const Coreq = db.coreq;
const Op = db.Sequelize.Op;

// Create and Save a new Coreq
export function create(req: Request, res: Response) {
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

  // Save Tutorial in the database
  Coreq.create(coreq)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Coreq.",
      });
    });
}

// Retrieve all Coreqs from the database.
export function findAll(req: Request, res: Response) {
  const coreq_id = req.query.coreq_id;
  const condition = coreq_id
    ? { coreq_id: { [Op.like]: `%${coreq_id}%` } }
    : null;

  Coreq.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Coreqs.",
      });
    });
}

// Find a single Coreq with an id
export function findOne(req: Request, res: Response) {
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
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving Coreq with id=" + id,
      });
    });
}

// Update a Coreq by the id in the request
exports.update = (req: Request, res: Response) => {
  const id = req.params.id;

  Coreq.update(req.body, {
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Coreq was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Coreq with id=${id}. Maybe Coreq was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Coreq with the specified id in the request
exports.delete = (req: Request, res: Response) => {
  const id = req.params.id;

  Coreq.destroy({
    where: { id: id },
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "Coreq was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Coreq with id=${id}. Maybe Coreq was not found!`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete Coreq with id=" + id,
      });
    });
};

// Delete all Coreq from the database.
exports.deleteAll = (req: Request, res: Response) => {
  Coreq.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: number) => {
      res.send({ message: `${nums} Coreqs were deleted successfully!` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Coreqs.",
      });
    });
};
