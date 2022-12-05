import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { Visual, VisualId } from "./visual";

export interface UserAttributes {
  id: string;
  pw: string;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserCreationAttributes = UserAttributes;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  pw!: string;

  // User hasMany Visual via user_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.STRING(25),
          allowNull: false,
          primaryKey: true,
        },
        pw: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Users",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
