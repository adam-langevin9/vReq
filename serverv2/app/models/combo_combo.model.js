module.exports = (sequelize, Sequelize) => {
  const ComboCombo = sequelize.define(
    "combo_combo",
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
      sub_combo_id: {
        field: "sub_combo_id",
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: require("./combo.model.js"),
          key: "combo_id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return ComboCombo;
};
