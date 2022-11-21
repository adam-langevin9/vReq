module.exports = (sequelize, Sequelize) => {
  const Vis = sequelize.define("vis", {
    vis_id: {
      field: "user_id",
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    vis_title: {
      field: "vis_title",
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    selected_degree_reqs: {
      field: "selected_degree_reqs",
      type: Sequelize.STRING(305),
    },
    user_id: {
      field: "user_id",
      type: Sequelize.STRING(25),
      allowNull: false,
      references: {
        model: require("./user.model.js"),
        key: "user_id",
      },
    },
    degree_id: {
      field: "degree_id",
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: require("./degree.model.js"),
        key: "degree_id",
      },
    },
  });

  return Vis;
};
