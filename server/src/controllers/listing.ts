import db from "../models";
import type { Request, Response } from "express";
import type { ListingAttributes } from "../models/init-models";
const Listing = db.listing;
const Op = db.Sequelize.Op;
export default module.exports = {
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

    // Save Tutorial in the database
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
    const id = req.query.id;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Listing.findAll({ where: condition })
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

  // Update a Listing by the id in the request
  update(req: Request, res: Response): void {
    const id = req.params.id;

    Listing.update(req.body, {
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Listing was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Listing with id=${id}. Maybe Listing was not found or req.body is empty!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  },

  // Delete a Listing with the specified id in the request
  delete(req: Request, res: Response): void {
    const id = req.params.id;

    Listing.destroy({
      where: { id },
    })
      .then((num: number) => {
        if (num === 1) {
          res.send({
            message: "Listing was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Listing with id=${id}. Maybe Listing was not found!`,
          });
        }
      })
      .catch((_err: Error) => {
        res.status(500).send({
          message: "Could not delete Listing with id=" + id,
        });
      });
  },

  // Delete all Listings from the database.
  deleteAll(req: Request, res: Response): void {
    Listing.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number) => {
        res.send({ message: `${nums} Listings were deleted successfully!` });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all Listings.",
        });
      });
  },
};
