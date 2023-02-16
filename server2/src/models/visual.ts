import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { User, UserId } from "./user";

export interface VisualAttributes {
  id: number;
  title: string;
  user_id: string;
  start_year: number;
  elements: JSON;
}

export type VisualPk = "id";
export type VisualId = Visual[VisualPk];
export type VisualOptionalAttributes = "id";
export type VisualCreationAttributes = Optional<VisualAttributes, VisualOptionalAttributes>;

export class Visual extends Model<VisualAttributes, VisualCreationAttributes> implements VisualAttributes {
  id!: number;
  title!: string;
  user_id!: string;
  start_year!: number;
  elements!: JSON;

  // Visual belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Visual {
    return Visual.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.STRING(25),
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        start_year: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        elements: {
          type: DataTypes.JSON,
          allowNull: false,
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
            name: "vis_user_fk_idx",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
  }
}
