import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const Combo = sequelize.define(
    "combo",
    {
      combo_id: {
        field: "combo_id",
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      combo_op: {
        field: "combo_op",
        type: DataTypes.ENUM("AND", "OR", "NOT", "ONE"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Combo;
};
