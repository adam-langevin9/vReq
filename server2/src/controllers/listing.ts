import { Listing } from "../models/init-models";
import type { Request, Response } from "express";

export default {
  // Retrieve all Degree Names from the database.
  validListing(req: Request, res: Response): void {
    const subj = req.query.subj;
    const num = req.query.num;
    if (subj === undefined || num === undefined) {
      res.status(200).send(false);
      return;
    }
    Listing.findOne({ where: { subj: subj as string, num: +(num as string) } })
      .then((data: any) => {
        res.status(200).send(!!data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Listing Subjects.",
        });
      });
  },
};
