import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Coreq, CoreqId } from "./coreq";
import type { Degree, DegreeId } from "./degree";

export interface ReqAttributes {
  id: number;
  start_year: number;
  req_string: string;
}

export type ReqPk = "id" | "start_year";
export type ReqId = Req[ReqPk];
export type ReqOptionalAttributes = "id";
export type ReqCreationAttributes = Optional<ReqAttributes, ReqOptionalAttributes>;

export class Req extends Model<ReqAttributes, ReqCreationAttributes> implements ReqAttributes {
  id!: number;
  start_year!: number;
  req_string!: string;

  // Req hasMany Coreq via precoreq_id
  coreqs!: Coreq[];
  getCoreqs!: Sequelize.HasManyGetAssociationsMixin<Coreq>;
  setCoreqs!: Sequelize.HasManySetAssociationsMixin<Coreq, CoreqId>;
  addCoreq!: Sequelize.HasManyAddAssociationMixin<Coreq, CoreqId>;
  addCoreqs!: Sequelize.HasManyAddAssociationsMixin<Coreq, CoreqId>;
  createCoreq!: Sequelize.HasManyCreateAssociationMixin<Coreq>;
  removeCoreq!: Sequelize.HasManyRemoveAssociationMixin<Coreq, CoreqId>;
  removeCoreqs!: Sequelize.HasManyRemoveAssociationsMixin<Coreq, CoreqId>;
  hasCoreq!: Sequelize.HasManyHasAssociationMixin<Coreq, CoreqId>;
  hasCoreqs!: Sequelize.HasManyHasAssociationsMixin<Coreq, CoreqId>;
  countCoreqs!: Sequelize.HasManyCountAssociationsMixin;
  // Req hasMany Coreq via prereq_id
  prereq_coreqs!: Coreq[];
  getPrereq_coreqs!: Sequelize.HasManyGetAssociationsMixin<Coreq>;
  setPrereq_coreqs!: Sequelize.HasManySetAssociationsMixin<Coreq, CoreqId>;
  addPrereq_coreq!: Sequelize.HasManyAddAssociationMixin<Coreq, CoreqId>;
  addPrereq_coreqs!: Sequelize.HasManyAddAssociationsMixin<Coreq, CoreqId>;
  createPrereq_coreq!: Sequelize.HasManyCreateAssociationMixin<Coreq>;
  removePrereq_coreq!: Sequelize.HasManyRemoveAssociationMixin<Coreq, CoreqId>;
  removePrereq_coreqs!: Sequelize.HasManyRemoveAssociationsMixin<Coreq, CoreqId>;
  hasPrereq_coreq!: Sequelize.HasManyHasAssociationMixin<Coreq, CoreqId>;
  hasPrereq_coreqs!: Sequelize.HasManyHasAssociationsMixin<Coreq, CoreqId>;
  countPrereq_coreqs!: Sequelize.HasManyCountAssociationsMixin;
  // Req hasMany Degree via req_id
  degrees!: Degree[];
  getDegrees!: Sequelize.HasManyGetAssociationsMixin<Degree>;
  setDegrees!: Sequelize.HasManySetAssociationsMixin<Degree, DegreeId>;
  addDegree!: Sequelize.HasManyAddAssociationMixin<Degree, DegreeId>;
  addDegrees!: Sequelize.HasManyAddAssociationsMixin<Degree, DegreeId>;
  createDegree!: Sequelize.HasManyCreateAssociationMixin<Degree>;
  removeDegree!: Sequelize.HasManyRemoveAssociationMixin<Degree, DegreeId>;
  removeDegrees!: Sequelize.HasManyRemoveAssociationsMixin<Degree, DegreeId>;
  hasDegree!: Sequelize.HasManyHasAssociationMixin<Degree, DegreeId>;
  hasDegrees!: Sequelize.HasManyHasAssociationsMixin<Degree, DegreeId>;
  countDegrees!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Req {
    return Req.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        start_year: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        req_string: {
          type: DataTypes.STRING(305),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Reqs",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "start_year" }],
          },
        ],
      }
    );
  }
}
