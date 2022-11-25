import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const Node = sequelize.define(
    "node",
    {
      vis_id: {
        field: "vis_id",
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: require("./vis.model.js"),
          key: "vis_id",
        },
      },
      listing_id: {
        field: "listing_id",
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: require("./listing.model.js"),
          key: "listing_id",
        },
      },
      is_complete: {
        field: "is_complete",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_manual: {
        field: "is_manual",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      selected_course_prereqs: {
        field: "selected_course_prereqs",
        type: DataTypes.STRING(120),
      },
      selected_course_precoreqs: {
        field: "selected_course_precoreqs",
        type: DataTypes.STRING(120),
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Node;
};
