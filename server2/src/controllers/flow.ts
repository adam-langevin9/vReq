import db from "../models";
import type { Request, Response } from "express";
import { getFlow } from "../middleware/FlowUtility";
import { Coreq, Course } from "../models/init-models";

const Listing = db.Listing;

export default {
  // Find a set of Courses and Listings withing a single coreq group
  async findFlow(req: Request, res: Response): Promise<void> {
    const subj = req.params.subj;
    const num = +req.params.num;
    const startYear = +req.params.startYear;
    const condition = { subj, num };

    const selectedListing = await Listing.findOne({
      where: condition,
      include: {
        model: Course,
        as: "course",
        include: {
          model: Coreq,
          as: "coreq",
          include: {
            model: Course,
            as: "courses",
            include: { model: Listing, as: "listings" },
          },
        },
      },
    });
    if (!selectedListing) {
      res.status(404).send({
        message: `Cannot find Listing ${subj} ${num}.`,
      });
      return;
    }

    res.send(await getFlow(selectedListing, startYear));
  },
};
