import db from "../models";
import { Op } from "sequelize";
import type { Request, Response } from "express";

const Course = db.course;

// Retrieve all Course from the database.
exports.findAll = (req: Request, res: Response) => {
  const course_id = req.query.course_id;
  const condition = course_id
    ? { course_id: { [Op.like]: `%${course_id}%` } }
    : null;

  Course.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Course with an id
exports.findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
