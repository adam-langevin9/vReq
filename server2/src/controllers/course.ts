import { Course, Listing } from "../models/init-models";
import type { Request, Response } from "express";

export default {
  // Retrieve all Courses from the database.
  findAll(_req: Request, res: Response): void {
    Course.findAll()
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Coreqs.",
        });
      });
  },

  // Find a single Course with an id
  findByPK(req: Request, res: Response): void {
    const id = +req.query.id!;

    Course.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.status(200).send(data);
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
    const subj = req.query.subj! as string;
    const num = +req.query.num!;

    const selectedListing = await Listing.findOne({
      where: { subj, num },
      include: { model: Course, as: "course", attributes: { exclude: ["id", "coreq_id"] } },
    });
    if (!selectedListing) {
      res.status(404).send({
        message: `Cannot find Listing ${subj} ${num}.`,
      });
      return;
    }

    res.status(200).send(selectedListing.course);
  },
};
