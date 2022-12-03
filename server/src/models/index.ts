"use strict";

import { Sequelize } from "sequelize";
import process from "process";
import { initModels } from "./init-models";
const env = process.env.NODE_ENV || "development";
const config = require("../config/db.config")[env];

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(
    <string>process.env[config.use_env_variable],
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = initModels(sequelize);

const db = models;

Object.keys(db).forEach((modelName) => {
  if (db[modelName as keyof typeof db].associate) {
    db[modelName as keyof typeof db].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
