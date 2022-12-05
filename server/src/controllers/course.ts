import db from "../models";
import type { Request, Response } from "express";
import type { CourseAttributes } from "../models/init-models";
const Course = db.course;
const Op = db.Sequelize.Op;

export default module.exports = {
  // Create and Save a new Course
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Course
    const course: CourseAttributes = {
      id: req.body.id,
      title: req.body.title,
      descr: req.body.descr,
      hours: req.body.hours,
      coreq_id: req.body.coreq_id,
    };

    // Save Tutorial in the database
    Course.create(course)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Course.",
        });
      });
  },

  // Retrieve all Courses from the database.
  findAll(req: Request, res: Response): void {
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Course.findAll({ where: condition })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Courses.",
        });
      });
  },

  // Find a single Course with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    Course.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Course with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Course with id=" + id,
        });
      });
  },

  // Update a Course by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    Course.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Course was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a Course with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    Course.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Course was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete Course with id=" + id,
        });
      });
  },

  // Delete all Courses from the database.
  deleteAll(req: Request, res: Response): void {
    Course.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} Courses were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all Courses.",
        });
      });
  },
};
