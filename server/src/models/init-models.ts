import type { Sequelize } from "sequelize";
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
  const Coreq = _Coreq.initModel(sequelize);
  const Course = _Course.initModel(sequelize);
  const Degree = _Degree.initModel(sequelize);
  const Listing = _Listing.initModel(sequelize);
  const Node = _Node.initModel(sequelize);
  const Req = _Req.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const Visual = _Visual.initModel(sequelize);

  Listing.belongsToMany(Visual, {
    as: "visual_id_visuals",
    through: Node,
    foreignKey: "listing_id",
    otherKey: "visual_id",
  });
  Visual.belongsToMany(Listing, {
    as: "listing_id_listings",
    through: Node,
    foreignKey: "visual_id",
    otherKey: "listing_id",
  });
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
  Node.belongsTo(Visual, { as: "visual", foreignKey: "visual_id" });
  Visual.hasMany(Node, { as: "nodes", foreignKey: "visual_id" });

  return {
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
