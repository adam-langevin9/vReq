import db from "../models";
import { Op } from "sequelize";
import type { Request, Response } from "express";

const Listing = db.listing;

// Retrieve all Listing from the database.
exports.findAll = (req: Request, res: Response) => {
  const listing_subj = req.query.listing_subj;
  const listing_num = req.query.listing_num;
  const condition =
    listing_subj && listing_num
      ? {
          listing_subj: { [Op.like]: `${listing_subj}` },
          listing_num: { [Op.like]: `${listing_num}` },
        }
      : null;

  Listing.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Listing with an id
exports.findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Listing.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
