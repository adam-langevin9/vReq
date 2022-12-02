import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Degree, DegreeId } from "./degree.model";
import type { Listing, ListingId } from "./listing.model";
import type { Node, NodeId } from "./node.model";
import type { User, UserId } from "./user.model";

export interface VisualAttributes {
  id: number;
  title: string;
  selected_degree_reqs?: string;
  user_id: string;
  degree_id?: number;
}

export type VisualPk = "id";
export type VisualId = Visual[VisualPk];
export type VisualOptionalAttributes = "selected_degree_reqs" | "degree_id";
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
  selected_degree_reqs?: string;
  user_id!: string;
  degree_id?: number;

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
  // Visual belongsToMany Listing via visual_id and listing_id
  listing_id_listings!: Listing[];
  getListing_id_listings!: Sequelize.BelongsToManyGetAssociationsMixin<Listing>;
  setListing_id_listings!: Sequelize.BelongsToManySetAssociationsMixin<
    Listing,
    ListingId
  >;
  addListing_id_listing!: Sequelize.BelongsToManyAddAssociationMixin<
    Listing,
    ListingId
  >;
  addListing_id_listings!: Sequelize.BelongsToManyAddAssociationsMixin<
    Listing,
    ListingId
  >;
  createListing_id_listing!: Sequelize.BelongsToManyCreateAssociationMixin<Listing>;
  removeListing_id_listing!: Sequelize.BelongsToManyRemoveAssociationMixin<
    Listing,
    ListingId
  >;
  removeListing_id_listings!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    Listing,
    ListingId
  >;
  hasListing_id_listing!: Sequelize.BelongsToManyHasAssociationMixin<
    Listing,
    ListingId
  >;
  hasListing_id_listings!: Sequelize.BelongsToManyHasAssociationsMixin<
    Listing,
    ListingId
  >;
  countListing_id_listings!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Visual hasMany Node via visual_id
  nodes!: Node[];
  getNodes!: Sequelize.HasManyGetAssociationsMixin<Node>;
  setNodes!: Sequelize.HasManySetAssociationsMixin<Node, NodeId>;
  addNode!: Sequelize.HasManyAddAssociationMixin<Node, NodeId>;
  addNodes!: Sequelize.HasManyAddAssociationsMixin<Node, NodeId>;
  createNode!: Sequelize.HasManyCreateAssociationMixin<Node>;
  removeNode!: Sequelize.HasManyRemoveAssociationMixin<Node, NodeId>;
  removeNodes!: Sequelize.HasManyRemoveAssociationsMixin<Node, NodeId>;
  hasNode!: Sequelize.HasManyHasAssociationMixin<Node, NodeId>;
  hasNodes!: Sequelize.HasManyHasAssociationsMixin<Node, NodeId>;
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
          unique: "vis_title_UNIQUE",
        },
        selected_degree_reqs: {
          type: DataTypes.STRING(305),
          allowNull: true,
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
            name: "vis_title_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [{ name: "title" }],
          },
          {
            name: "user_id_fk_idx",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "degree_id_fk_idx",
            using: "BTREE",
            fields: [{ name: "degree_id" }],
          },
        ],
      }
    );
  }
}
