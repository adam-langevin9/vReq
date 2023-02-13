import type { Request, Response } from "express";
import { getCoreqFlow, getDegreeFlow } from "../middleware/FlowUtilities";
import { Combo, Coreq, Course, Degree, Req, Listing } from "../models/init-models";

export default {
  async findListingFlow(req: Request, res: Response): Promise<void> {
    const subj = req.params.subj;
    const num = +req.params.num;
    const startYear = +req.params.startYear;
    const condition = { subj, num };

    const selectedListing = await Listing.findOne({
      where: condition,
      include: {
        model: Course,
        as: "course",
        include: [
          {
            model: Coreq,
            as: "coreq",
            include: [
              {
                model: Course,
                as: "courses",
                include: [{ model: Listing, as: "listings" }],
              },
            ],
          },
        ],
      },
    });
    if (!selectedListing) {
      res.status(404).send({
        message: `Cannot find Listing ${subj} ${num}.`,
      });
      return;
    }

    const flow = await getCoreqFlow(selectedListing.course.coreq, selectedListing, startYear);

    res.send(flow);
  },

  async findDegreeFlow(req: Request, res: Response): Promise<void> {
    const degree_id = +req.params.degree_id;
    const startYear = +req.params.startYear;

    const degree = await Degree.findByPk(degree_id, {
      include: [
        {
          model: Req,
          as: "req",
          include: [
            {
              model: Combo,
              as: "combo",
            },
          ],
        },
      ],
    });
    if (!degree) {
      res.status(404).send({
        message: `Cannot find Degree ${degree_id}.`,
      });
      return;
    }

    const flow = await getDegreeFlow(degree, startYear);

    res.send(flow);
  },
};
