import { db } from "../models";
import { Op } from "sequelize";

const Course = db.course;

// Retrieve all Course from the database.
exports.findAll = (req, res) => {
  const course_id = req.query.course_id;
  const condition = course_id
    ? { course_id: { [Op.like]: `%${course_id}%` } }
    : null;

  Course.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
