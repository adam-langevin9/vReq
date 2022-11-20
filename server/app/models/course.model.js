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
        allowNull: false,
      },
      course_hours: {
        field: "course_hours",
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      course_prereqs: {
        field: "course_prereqs",
        type: Sequelize.STRING(120),
      },
      course_precoreqs: {
        field: "course_precoreqs",
        type: Sequelize.STRING(120),
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Course;
};
