import { Degree } from "../models/init-models";
import type { Request, Response } from "express";

export default {
  // Retrieve all Courses from the database.
  findAll(_req: Request, res: Response): void {
    Degree.findAll({ attributes: ["id", "title"] })
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Degrees.",
        });
      });
  },
};
