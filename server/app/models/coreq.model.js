module.exports = (sequelize, Sequelize) => {
  const Coreq = sequelize.define(
    "coreq",
    {
      coreq_id: {
        field: "coreq_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      course_id: {
        field: "course_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
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

  return Coreq;
};
