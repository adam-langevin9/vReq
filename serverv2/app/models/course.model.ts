import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const Course = sequelize.define(
    "course",
    {
      course_id: {
        field: "course_id",
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      course_title: {
        field: "course_title",
        type: DataTypes.STRING(85),
        allowNull: false,
      },
      course_descr: {
        field: "course_descr",
        type: DataTypes.STRING(750),
      },
      course_hours: {
        field: "course_hours",
        type: DataTypes.STRING(8),
      },
      course_prereqs: {
        field: "course_prereqs",
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: require("./req.model.js"),
          key: "req_id",
        },
      },
      course_precoreqs: {
        field: "course_precoreqs",
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: require("./req.model.js"),
          key: "req_id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Course;
};
