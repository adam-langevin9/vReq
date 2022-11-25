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
    },
    {
      freezeTableName: true,
    }
  );

  return Course;
};
