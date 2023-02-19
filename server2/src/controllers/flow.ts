import type { Request, Response } from "express";
import { getCoreqFlow, getDegreeFlow } from "../middleware/FlowUtilities";
import { Combo, Coreq, Course, Degree, Req, Listing } from "../models/init-models";

export default {
  async findListingFlow(req: Request, res: Response): Promise<void> {
    const subj = req.query.subj as string;
    const num = +req.query.num!;
    const start_year = req.query.start_year ? +req.query.start_year : undefined;

    const selectedListing = await Listing.findOne({
      where: { subj, num },
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

    const flow = await getCoreqFlow(selectedListing.course.coreq, selectedListing, start_year);

    res.status(200).send(flow);
  },

  async findDegreeFlow(req: Request, res: Response): Promise<void> {
    const degree_id = +req.query.degreeId!;
    const start_year = req.query.startYear ? +req.query.startYear : undefined;

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

    const flow = await getDegreeFlow(degree, start_year);

    res.status(200).send(flow);
  },
};
