import db from "../models";
import type { Request, Response } from "express";
import { CoreqAttributes } from "../models/init-models";
import { getDetailedCoreq } from "../middleware/CoreqUtility";

const Coreq = db.Coreq;
const Listing = db.Listing;

export default {
  // Find a set of Courses and Listings withing a single coreq group
  async findDetailedCoreq(req: Request, res: Response): Promise<void> {
    const subj = req.params.subj;
    const num = +req.params.num;
    const condition = { subj, num };

    const selectedListing = await Listing.findOne({ where: condition });
    if (!selectedListing) {
      res.status(404).send({
        message: `Cannot find Listing ${subj} ${num}.`,
      });
      return;
    }

    res.send(await getDetailedCoreq(await (await selectedListing.getCourse()).getCoreq(), selectedListing));
  },

  // Get dependancy chain given a coreq
  async getDependencies(req: Request, res: Response): Promise<void> {},
};
