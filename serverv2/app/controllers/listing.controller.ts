import { db } from "../models";
import { Op } from "sequelize";

const Listing = db.listing;

// Retrieve all Listing from the database.
exports.findAll = (
  req: { query: { listing_subj: any; listing_num: any } },
  res: {
    send: (arg0: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: any }): void; new (): any };
    };
  }
) => {
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
    .catch((err: { message: any }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Listing with an id
exports.findOne = (
  req: { params: { id: any } },
  res: {
    send: (arg0: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: string }): void; new (): any };
    };
  }
) => {
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
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
