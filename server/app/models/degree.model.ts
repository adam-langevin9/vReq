import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const Degree = sequelize.define(
    "degree",
    {
      degree_id: {
        field: "degree_id",
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      degree_title: {
        field: "degree_title",
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      degree_reqs: {
        field: "degree_reqs",
        type: DataTypes.STRING(305),
        allowNull: false,
      },
      degree_start_year: {
        field: "degree_start_year",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Degree;
};
