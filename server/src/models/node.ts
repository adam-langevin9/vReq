import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Listing, ListingId } from "./listing";
import type { Visual, VisualId } from "./visual";

export interface NodeAttributes {
  visual_id: number;
  listing_id: number;
  is_complete: number;
  is_manual: number;
  selected_prereqs?: string;
  selected_precoreqs?: string;
}

export type NodePk = "visual_id" | "listing_id";
export type NodeId = Node[NodePk];
export type NodeOptionalAttributes = "selected_prereqs" | "selected_precoreqs";
export type NodeCreationAttributes = Optional<NodeAttributes, NodeOptionalAttributes>;

export class Node extends Model<NodeAttributes, NodeCreationAttributes> implements NodeAttributes {
  visual_id!: number;
  listing_id!: number;
  is_complete!: number;
  is_manual!: number;
  selected_prereqs?: string;
  selected_precoreqs?: string;

  // Node belongsTo Listing via listing_id
  listing!: Listing;
  getListing!: Sequelize.BelongsToGetAssociationMixin<Listing>;
  setListing!: Sequelize.BelongsToSetAssociationMixin<Listing, ListingId>;
  createListing!: Sequelize.BelongsToCreateAssociationMixin<Listing>;
  // Node belongsTo Visual via visual_id
  visual!: Visual;
  getVisual!: Sequelize.BelongsToGetAssociationMixin<Visual>;
  setVisual!: Sequelize.BelongsToSetAssociationMixin<Visual, VisualId>;
  createVisual!: Sequelize.BelongsToCreateAssociationMixin<Visual>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Node {
    return Node.init(
      {
        visual_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "Visuals",
            key: "id",
          },
        },
        listing_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "Listings",
            key: "id",
          },
        },
        is_complete: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        is_manual: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        selected_prereqs: {
          type: DataTypes.STRING(120),
          allowNull: true,
        },
        selected_precoreqs: {
          type: DataTypes.STRING(120),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Nodes",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "visual_id" }, { name: "listing_id" }],
          },
          {
            name: "node_listing_fk_idx",
            using: "BTREE",
            fields: [{ name: "listing_id" }],
          },
        ],
      }
    );
  }
}
