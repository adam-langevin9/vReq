import db from "../models";
import type { Request, Response } from "express";
import type { ListingAttributes } from "../models/init-models";
const Listing = db.Listing;
export default {
  // Create and Save a new Listing
  create(req: Request, res: Response): void {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Listing
    const listing: ListingAttributes = {
      id: req.body.id,
      subj: req.body.subj,
      num: req.body.num,
      course_id: req.body.course_id,
    };

    // Save Listing in the database
    Listing.create(listing)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Listing.",
        });
      });
  },

  // Retrieve all Listings from the database.
  findAll(req: Request, res: Response): void {
    Listing.findAll()
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Listings.",
        });
      });
  },

  // Find a single Listing with an id
  findOne(req: Request, res: Response): void {
    const id = req.params.id;

    Listing.findByPk(id)
      .then((data: any) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Listing with id=${id}.`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error retrieving Listing with id=" + id,
        });
      });
  },
};
