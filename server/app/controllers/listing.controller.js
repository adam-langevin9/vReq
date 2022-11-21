const db = require("../models");
const Listing = db.listing;
const Op = db.Sequelize.Op;

// Retrieve all Listing from the database.
exports.findAll = (req, res) => {
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Listing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Listing.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
