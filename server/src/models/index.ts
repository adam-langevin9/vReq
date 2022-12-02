import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: dbConfig.POOL,
  define: {
    timestamps: false,
  },
});
export const db = {
  sequelize: sequelize,
  combo: require("./combo.model.js")(sequelize),
  user: require("./user.model.js")(sequelize),
  degree: require("./degree.model.js")(sequelize),
  course: require("./course.model.js")(sequelize),
  req: require("./req.model.js")(sequelize),
  coreq: require("./coreq.model.js")(sequelize),
  listing: require("./listing.model.js")(sequelize),
  vis: require("./vis.model.js")(sequelize),
  node: require("./node.model.js")(sequelize),
  combo_course: require("./combo_course.model.js")(sequelize),
  combo_combo: require("./combo_combo.model.js")(sequelize),
};

export default db;
