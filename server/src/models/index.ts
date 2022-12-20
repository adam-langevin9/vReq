"use strict";

import { Sequelize, Options } from "sequelize";
import { initModels } from "./init-models";
import config from "../configs/config";

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  config as Options
);

const models = initModels(sequelize);

const db = models;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
