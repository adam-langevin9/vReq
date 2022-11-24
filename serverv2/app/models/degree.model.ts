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

  return Degree;
};
