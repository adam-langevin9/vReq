import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Combo, ComboId } from "./combo";
import type { Degree, DegreeId } from "./degree";
import type { Node } from "./node";
import type { ListingId } from "./listing";
import type { User, UserId } from "./user";

export interface VisualAttributes {
  id: number;
  title: string;
  selected_reqs?: number;
  user_id: string;
  degree_id?: number;
}

export type VisualPk = "id";
export type VisualId = Visual[VisualPk];
export type VisualOptionalAttributes = "selected_reqs" | "degree_id";
export type VisualCreationAttributes = Optional<
  VisualAttributes,
  VisualOptionalAttributes
>;

export class Visual
  extends Model<VisualAttributes, VisualCreationAttributes>
  implements VisualAttributes
{
  id!: number;
  title!: string;
  selected_reqs?: number;
  user_id!: string;
  degree_id?: number;

  // Visual belongsTo Combo via selected_reqs
  selected_reqs_combo!: Combo;
  getSelected_reqs_combo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setSelected_reqs_combo!: Sequelize.BelongsToSetAssociationMixin<
    Combo,
    ComboId
  >;
  createSelected_reqs_combo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // Visual belongsTo Degree via degree_id
  degree!: Degree;
  getDegree!: Sequelize.BelongsToGetAssociationMixin<Degree>;
  setDegree!: Sequelize.BelongsToSetAssociationMixin<Degree, DegreeId>;
  createDegree!: Sequelize.BelongsToCreateAssociationMixin<Degree>;
  // Visual belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  // Visual hasMany Node via vis_id
  nodes!: Node[];
  getNodes!: Sequelize.HasManyGetAssociationsMixin<Node>;
  setNodes!: Sequelize.HasManySetAssociationsMixin<Node, ListingId>;
  addNode!: Sequelize.HasManyAddAssociationMixin<Node, ListingId>;
  addNodes!: Sequelize.HasManyAddAssociationsMixin<Node, ListingId>;
  createNode!: Sequelize.HasManyCreateAssociationMixin<Node>;
  removeNode!: Sequelize.HasManyRemoveAssociationMixin<Node, ListingId>;
  removeNodes!: Sequelize.HasManyRemoveAssociationsMixin<Node, ListingId>;
  hasNode!: Sequelize.HasManyHasAssociationMixin<Node, ListingId>;
  hasNodes!: Sequelize.HasManyHasAssociationsMixin<Node, ListingId>;
  countNodes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Visual {
    return Visual.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        selected_reqs: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Combos",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.STRING(25),
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        degree_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Degrees",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "Visuals",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "vis_title_user_u",
            unique: true,
            using: "BTREE",
            fields: [{ name: "title" }, { name: "user_id" }],
          },
          {
            name: "vis_combo_fk_idx",
            using: "BTREE",
            fields: [{ name: "selected_reqs" }],
          },
          {
            name: "vis_degree_fk_idx",
            using: "BTREE",
            fields: [{ name: "degree_id" }],
          },
          {
            name: "vis_user_fk_idx",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
  }
}
