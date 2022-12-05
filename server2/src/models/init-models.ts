import type { Sequelize } from "sequelize";
import { ComboCombo as _ComboCombo } from "./combo_combo";
import type { ComboComboAttributes, ComboComboCreationAttributes } from "./combo_combo";
import { ComboCoreq as _ComboCoreq } from "./combo_coreq";
import type { ComboCoreqAttributes, ComboCoreqCreationAttributes } from "./combo_coreq";
import { Combo as _Combo } from "./combo";
import type { ComboAttributes, ComboCreationAttributes } from "./combo";
import { Coreq as _Coreq } from "./coreq";
import type { CoreqAttributes, CoreqCreationAttributes } from "./coreq";
import { Course as _Course } from "./course";
import type { CourseAttributes, CourseCreationAttributes } from "./course";
import { Degree as _Degree } from "./degree";
import type { DegreeAttributes, DegreeCreationAttributes } from "./degree";
import { Listing as _Listing } from "./listing";
import type { ListingAttributes, ListingCreationAttributes } from "./listing";
import { Node as _Node } from "./node";
import type { NodeAttributes, NodeCreationAttributes } from "./node";
import { Req as _Req } from "./req";
import type { ReqAttributes, ReqCreationAttributes } from "./req";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { Visual as _Visual } from "./visual";
import type { VisualAttributes, VisualCreationAttributes } from "./visual";

export {
  _ComboCombo as ComboCombo,
  _ComboCoreq as ComboCoreq,
  _Combo as Combo,
  _Coreq as Coreq,
  _Course as Course,
  _Degree as Degree,
  _Listing as Listing,
  _Node as Node,
  _Req as Req,
  _User as User,
  _Visual as Visual,
};

export type {
  ComboComboAttributes,
  ComboComboCreationAttributes,
  ComboCoreqAttributes,
  ComboCoreqCreationAttributes,
  ComboAttributes,
  ComboCreationAttributes,
  CoreqAttributes,
  CoreqCreationAttributes,
  CourseAttributes,
  CourseCreationAttributes,
  DegreeAttributes,
  DegreeCreationAttributes,
  ListingAttributes,
  ListingCreationAttributes,
  NodeAttributes,
  NodeCreationAttributes,
  ReqAttributes,
  ReqCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  VisualAttributes,
  VisualCreationAttributes,
};

export function initModels(sequelize: Sequelize): Record<any, any> {
  const ComboCombo = _ComboCombo.initModel(sequelize);
  const ComboCoreq = _ComboCoreq.initModel(sequelize);
  const Combo = _Combo.initModel(sequelize);
  const Coreq = _Coreq.initModel(sequelize);
  const Course = _Course.initModel(sequelize);
  const Degree = _Degree.initModel(sequelize);
  const Listing = _Listing.initModel(sequelize);
  const Node = _Node.initModel(sequelize);
  const Req = _Req.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const Visual = _Visual.initModel(sequelize);

  Combo.belongsToMany(Combo, {
    as: "sub_combo_id_combos",
    through: ComboCombo,
    foreignKey: "combo_id",
    otherKey: "sub_combo_id",
  });
  Combo.belongsToMany(Combo, {
    as: "combo_id_combos",
    through: ComboCombo,
    foreignKey: "sub_combo_id",
    otherKey: "combo_id",
  });
  Combo.belongsToMany(Coreq, {
    as: "coreq_id_coreqs",
    through: ComboCoreq,
    foreignKey: "combo_id",
    otherKey: "coreq_id",
  });
  Coreq.belongsToMany(Combo, {
    as: "combo_id_combos_combo_coreqs",
    through: ComboCoreq,
    foreignKey: "coreq_id",
    otherKey: "combo_id",
  });
  ComboCombo.belongsTo(Combo, { as: "combo", foreignKey: "combo_id" });
  Combo.hasMany(ComboCombo, { as: "combo_combos", foreignKey: "combo_id" });
  ComboCombo.belongsTo(Combo, { as: "sub_combo", foreignKey: "sub_combo_id" });
  Combo.hasMany(ComboCombo, {
    as: "sub_combo_combo_combos",
    foreignKey: "sub_combo_id",
  });
  ComboCoreq.belongsTo(Combo, { as: "combo", foreignKey: "combo_id" });
  Combo.hasMany(ComboCoreq, { as: "combo_coreqs", foreignKey: "combo_id" });
  Node.belongsTo(Combo, {
    as: "selected_precoreqs_combo",
    foreignKey: "selected_precoreqs",
  });
  Combo.hasMany(Node, { as: "nodes", foreignKey: "selected_precoreqs" });
  Node.belongsTo(Combo, {
    as: "selected_prereqs_combo",
    foreignKey: "selected_prereqs",
  });
  Combo.hasMany(Node, {
    as: "selected_prereqs_nodes",
    foreignKey: "selected_prereqs",
  });
  Req.belongsTo(Combo, { as: "combo", foreignKey: "combo_id" });
  Combo.hasMany(Req, { as: "reqs", foreignKey: "combo_id" });
  Visual.belongsTo(Combo, {
    as: "selected_reqs_combo",
    foreignKey: "selected_reqs",
  });
  Combo.hasMany(Visual, { as: "visuals", foreignKey: "selected_reqs" });
  ComboCoreq.belongsTo(Coreq, { as: "coreq", foreignKey: "coreq_id" });
  Coreq.hasMany(ComboCoreq, { as: "combo_coreqs", foreignKey: "coreq_id" });
  Course.belongsTo(Coreq, { as: "coreq", foreignKey: "coreq_id" });
  Coreq.hasMany(Course, { as: "courses", foreignKey: "coreq_id" });
  Listing.belongsTo(Course, { as: "course", foreignKey: "course_id" });
  Course.hasMany(Listing, { as: "listings", foreignKey: "course_id" });
  Visual.belongsTo(Degree, { as: "degree", foreignKey: "degree_id" });
  Degree.hasMany(Visual, { as: "visuals", foreignKey: "degree_id" });
  Node.belongsTo(Listing, { as: "listing", foreignKey: "listing_id" });
  Listing.hasMany(Node, { as: "nodes", foreignKey: "listing_id" });
  Coreq.belongsTo(Req, { as: "precoreq", foreignKey: "precoreq_id" });
  Req.hasMany(Coreq, { as: "coreqs", foreignKey: "precoreq_id" });
  Coreq.belongsTo(Req, { as: "prereq", foreignKey: "prereq_id" });
  Req.hasMany(Coreq, { as: "prereq_coreqs", foreignKey: "prereq_id" });
  Degree.belongsTo(Req, { as: "req", foreignKey: "req_id" });
  Req.hasMany(Degree, { as: "degrees", foreignKey: "req_id" });
  Visual.belongsTo(User, { as: "user", foreignKey: "user_id" });
  User.hasMany(Visual, { as: "visuals", foreignKey: "user_id" });
  Node.belongsTo(Visual, { as: "vi", foreignKey: "vis_id" });
  Visual.hasMany(Node, { as: "nodes", foreignKey: "vis_id" });

  return {
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
}
