import db from "../models";
import type { Request, Response } from "express";
import { CourseAttributes } from "../models/init-models";

const Course = db.Course;
const Listing = db.Listing;

export default {
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

    // Save Course in the database
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
    Course.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Coreqs.",
        });
      });
  },

  // Find a single Course with an id
  findByPK(req: Request, res: Response): void {
    const id = +req.params.id;

    Course.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Course with id ${id}`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: `Error retrieving Course with id ${id}`,
        });
      });
  },

  async findListingCourse(req: Request, res: Response): Promise<void> {
    const subj = req.params.subj;
    const num = +req.params.num;
    const condition = { subj, num };

    const selectedListing = await Listing.findOne({
      where: condition,
      include: { model: Course, as: "course", attributes: { exclude: ["id", "coreq_id"] } },
    });
    if (!selectedListing) {
      res.status(404).send({
        message: `Cannot find Listing ${subj} ${num}.`,
      });
      return;
    }

    res.send(selectedListing.course);
  },
};
