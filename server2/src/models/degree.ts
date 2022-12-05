import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Req, ReqId } from "./req";
import type { Visual, VisualId } from "./visual";

export interface DegreeAttributes {
  id: number;
  title: string;
  req_id: number;
  other_reqs?: string;
}

export type DegreePk = "id";
export type DegreeId = Degree[DegreePk];
export type DegreeOptionalAttributes = "id" | "other_reqs";
export type DegreeCreationAttributes = Optional<DegreeAttributes, DegreeOptionalAttributes>;

export class Degree extends Model<DegreeAttributes, DegreeCreationAttributes> implements DegreeAttributes {
  id!: number;
  title!: string;
  req_id!: number;
  other_reqs?: string;

  // Degree hasMany Visual via degree_id
  visuals!: Visual[];
  getVisuals!: Sequelize.HasManyGetAssociationsMixin<Visual>;
  setVisuals!: Sequelize.HasManySetAssociationsMixin<Visual, VisualId>;
  addVisual!: Sequelize.HasManyAddAssociationMixin<Visual, VisualId>;
  addVisuals!: Sequelize.HasManyAddAssociationsMixin<Visual, VisualId>;
  createVisual!: Sequelize.HasManyCreateAssociationMixin<Visual>;
  removeVisual!: Sequelize.HasManyRemoveAssociationMixin<Visual, VisualId>;
  removeVisuals!: Sequelize.HasManyRemoveAssociationsMixin<Visual, VisualId>;
  hasVisual!: Sequelize.HasManyHasAssociationMixin<Visual, VisualId>;
  hasVisuals!: Sequelize.HasManyHasAssociationsMixin<Visual, VisualId>;
  countVisuals!: Sequelize.HasManyCountAssociationsMixin;
  // Degree belongsTo Req via req_id
  req!: Req;
  getReq!: Sequelize.BelongsToGetAssociationMixin<Req>;
  setReq!: Sequelize.BelongsToSetAssociationMixin<Req, ReqId>;
  createReq!: Sequelize.BelongsToCreateAssociationMixin<Req>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Degree {
    return Degree.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        req_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "Reqs",
            key: "id",
          },
        },
        other_reqs: {
          type: DataTypes.STRING(750),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Degrees",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "degree_req_fk_idx",
            using: "BTREE",
            fields: [{ name: "req_id" }],
          },
        ],
      }
    );
  }
}
