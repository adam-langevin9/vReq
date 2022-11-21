module.exports = (sequelize, Sequelize) => {
  const Degree = sequelize.define(
    "degree",
    {
      degree_id: {
        field: "degree_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      degree_title: {
        field: "degree_title",
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      degree_reqs: {
        field: "degree_reqs",
        type: Sequelize.INTEGER.UNSIGNED,
      },
      degree_start_year: {
        field: "degree_start_year",
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Degree;
};
