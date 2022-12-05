import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Combo, ComboId } from "./combo";
import type { Listing, ListingId } from "./listing";
import type { Visual, VisualId } from "./visual";

export interface NodeAttributes {
  vis_id: number;
  listing_id: number;
  is_complete: number;
  is_manual: number;
  selected_prereqs?: number;
  selected_precoreqs?: number;
}

export type NodeOptionalAttributes = "selected_prereqs" | "selected_precoreqs";
export type NodeCreationAttributes = Optional<NodeAttributes, NodeOptionalAttributes>;

export class Node extends Model<NodeAttributes, NodeCreationAttributes> implements NodeAttributes {
  vis_id!: number;
  listing_id!: number;
  is_complete!: number;
  is_manual!: number;
  selected_prereqs?: number;
  selected_precoreqs?: number;

  // Node belongsTo Combo via selected_precoreqs
  selected_precoreqs_combo!: Combo;
  getSelected_precoreqs_combo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setSelected_precoreqs_combo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createSelected_precoreqs_combo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // Node belongsTo Combo via selected_prereqs
  selected_prereqs_combo!: Combo;
  getSelected_prereqs_combo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setSelected_prereqs_combo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createSelected_prereqs_combo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // Node belongsTo Listing via listing_id
  listing!: Listing;
  getListing!: Sequelize.BelongsToGetAssociationMixin<Listing>;
  setListing!: Sequelize.BelongsToSetAssociationMixin<Listing, ListingId>;
  createListing!: Sequelize.BelongsToCreateAssociationMixin<Listing>;
  // Node belongsTo Visual via vis_id
  vi!: Visual;
  getVi!: Sequelize.BelongsToGetAssociationMixin<Visual>;
  setVi!: Sequelize.BelongsToSetAssociationMixin<Visual, VisualId>;
  createVi!: Sequelize.BelongsToCreateAssociationMixin<Visual>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Node {
    return Node.init(
      {
        vis_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "Visuals",
            key: "id",
          },
        },
        listing_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
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
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Combos",
            key: "id",
          },
        },
        selected_precoreqs: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Combos",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "Nodes",
        timestamps: false,
        indexes: [
          {
            name: "node_listing_fk_idx",
            using: "BTREE",
            fields: [{ name: "listing_id" }],
          },
          {
            name: "node_precoreq_course_fk_idx",
            using: "BTREE",
            fields: [{ name: "selected_precoreqs" }],
          },
          {
            name: "node_prereq_course_fk_idx",
            using: "BTREE",
            fields: [{ name: "selected_prereqs" }],
          },
          {
            name: "node_vis_fk_idx",
            using: "BTREE",
            fields: [{ name: "vis_id" }],
          },
        ],
      }
    );
  }
}
