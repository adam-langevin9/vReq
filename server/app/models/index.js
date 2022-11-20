const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: dbConfig.POOL,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.degree = require("./degree.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.coreq = require("./coreq.model.js")(sequelize, Sequelize);
db.listing = require("./listing.model.js")(sequelize, Sequelize);
db.vis = require("./vis.model.js")(sequelize, Sequelize);
db.node = require("./node.model.js")(sequelize, Sequelize);

module.exports = db;
