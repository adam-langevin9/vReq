import db from "../models";
import type { Request, Response } from "express";
import { CoreqAttributes, CourseAttributes, ListingAttributes } from "../models/init-models";

interface DetailedCoreq {
  id: number;
  prereq_id?: number;
  precoreq_id?: number;
  courses: Array<{
    id: number;
    title: string;
    hours: string;
    descr?: string;
    selectedListing: {
      id: number;
      subj: string;
      num: number;
    };
    listings: Array<{
      id: number;
      subj: string;
      num: number;
    }>;
  }>;
}

const Coreq = db.Coreq;
const Listing = db.Listing;

export default {
  // Create and Save a new Coreq
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Coreq
    const coreq: CoreqAttributes = {
      id: req.body.id,
      prereq_id: req.body.prereq_id,
      precoreq_id: req.body.precoreq_id,
    };

    // Save Coreq in the database
    Coreq.create(coreq)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Coreq.",
        });
      });
  },

  // Retrieve all Coreqs from the database.
  findAll(req: Request, res: Response): void {
    Coreq.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Coreqs.",
        });
      });
  },

  // Find a single Coreq with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    Coreq.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Coreq with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Coreq with id=" + id,
        });
      });
  },

  // Find a set of Courses and Listings withing a single coreq group
  async findByListing(req: Request, res: Response): Promise<void> {
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

    const coreq = await (await selectedListing.getCourse()).getCoreq();
    const courses = await coreq.getCourses();

    var detailedCoreq: DetailedCoreq = {
      id: coreq.id,
      prereq_id: coreq.prereq_id,
      precoreq_id: coreq.precoreq_id,
      courses: [],
    };

    for (const course of courses) {
      const listings = await course.getListings({ attributes: { exclude: ["course_id"] } });
      const hasSelectedListing = listings.map((listing) => listing.subj).includes(selectedListing.subj);
      detailedCoreq.courses.push({
        id: course.id,
        title: course.title,
        hours: course.hours,
        descr: course.descr,
        selectedListing: {
          id: hasSelectedListing ? selectedListing.id : listings[0].id,
          subj: hasSelectedListing ? selectedListing.subj : listings[0].subj,
          num: hasSelectedListing ? selectedListing.num : listings[0].num,
        },
        listings,
      });
    }

    res.send(detailedCoreq);
  },
};
