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

const { ComboCombo, ComboCoreq, Combo, Coreq, Course, Degree, Listing, Node, Req, User, Visual } =
  initModels(sequelize);

export default {
  Sequelize,
  sequelize,
  ComboCombo,
  ComboCoreq,
  Combo,
  Coreq,
  Course,
  Degree,
  Listing,
  Node,
  Req,
  User,
  Visual,
};
