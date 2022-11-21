const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: dbConfig.POOL,
  define: {
    timestamps: false,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.combo = require("./combo.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.degree = require("./degree.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.coreq = require("./coreq.model.js")(sequelize, Sequelize);
db.listing = require("./listing.model.js")(sequelize, Sequelize);
db.vis = require("./vis.model.js")(sequelize, Sequelize);
db.node = require("./node.model.js")(sequelize, Sequelize);
db.combo_course = require("./combo_course.model.js")(sequelize, Sequelize);
db.combo_combo = require("./combo_combo.model.js")(sequelize, Sequelize);

module.exports = db;
