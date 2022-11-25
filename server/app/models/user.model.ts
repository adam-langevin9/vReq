import { DataTypes, Sequelize } from "sequelize";

export default module.exports = (sequelize: Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        field: "user_id",
        type: DataTypes.STRING(25),
        primaryKey: true,
        allowNull: false,
      },
      user_pw: {
        field: "user_pw",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
