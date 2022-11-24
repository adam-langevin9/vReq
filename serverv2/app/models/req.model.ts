import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const Course = sequelize.define(
    "course",
    {
      req_id: {
        field: "course_id",
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      req_start_year: {
        field: "course_title",
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      combo_id: {
        field: "course_descr",
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: require("./combo.model.js"),
          key: "combo_id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Course;
};
