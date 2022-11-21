module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    "course",
    {
      course_id: {
        field: "course_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      course_title: {
        field: "course_title",
        type: Sequelize.STRING(85),
        allowNull: false,
      },
      course_descr: {
        field: "course_descr",
        type: Sequelize.STRING(750),
      },
      course_hours: {
        field: "course_hours",
        type: Sequelize.STRING(8),
      },
      course_prereqs: {
        field: "course_prereqs",
        type: Sequelize.INTEGER.UNSIGNED,
      },
      course_precoreqs: {
        field: "course_precoreqs",
        type: Sequelize.INTEGER.UNSIGNED,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Course;
};
