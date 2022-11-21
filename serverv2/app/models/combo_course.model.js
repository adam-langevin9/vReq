module.exports = (sequelize, Sequelize) => {
  const ComboCourse = sequelize.define(
    "combo_course",
    {
      combo_id: {
        field: "combo_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: require("./combo.model.js"),
          key: "combo_id",
        },
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

  return ComboCourse;
};
