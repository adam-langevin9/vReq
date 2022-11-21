module.exports = (sequelize, Sequelize) => {
  const Combo = sequelize.define(
    "combo",
    {
      combo_id: {
        field: "combo_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      combo_op: {
        field: "combo_op",
        type: Sequelize.ENUM("AND", "OR", "NOT", "ONE"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Combo;
};
