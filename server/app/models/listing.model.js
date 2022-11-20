module.exports = (sequelize, Sequelize) => {
  const Listing = sequelize.define(
    "listing",
    {
      listing_id: {
        field: "listing_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      listing_subj: {
        field: "listing_subj",
        type: Sequelize.STRING(4),
        allowNull: false,
        unique: "compositeIndex",
      },
      listing_num: {
        field: "listing_num",
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        unique: "compositeIndex",
      },
      course_id: {
        field: "course_id",
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: require("./course.model.js"),
          key: "course_id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Listing;
};
