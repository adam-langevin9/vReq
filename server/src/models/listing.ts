import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Course, CourseId } from "./course";
import type { Node, NodeId } from "./node";
import type { Visual, VisualId } from "./visual";

export interface ListingAttributes {
  id: number;
  subj: string;
  num: number;
  course_id: number;
}

export type ListingPk = "id";
export type ListingId = Listing[ListingPk];
export type ListingOptionalAttributes = "id";
export type ListingCreationAttributes = Optional<ListingAttributes, ListingOptionalAttributes>;

export class Listing extends Model<ListingAttributes, ListingCreationAttributes> implements ListingAttributes {
  id!: number;
  subj!: string;
  num!: number;
  course_id!: number;

  // Listing belongsTo Course via course_id
  course!: Course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<Course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<Course, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<Course>;
  // Listing hasMany Node via listing_id
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
  // Listing belongsToMany Visual via listing_id and visual_id
  visual_id_visuals!: Visual[];
  getVisual_id_visuals!: Sequelize.BelongsToManyGetAssociationsMixin<Visual>;
  setVisual_id_visuals!: Sequelize.BelongsToManySetAssociationsMixin<Visual, VisualId>;
  addVisual_id_visual!: Sequelize.BelongsToManyAddAssociationMixin<Visual, VisualId>;
  addVisual_id_visuals!: Sequelize.BelongsToManyAddAssociationsMixin<Visual, VisualId>;
  createVisual_id_visual!: Sequelize.BelongsToManyCreateAssociationMixin<Visual>;
  removeVisual_id_visual!: Sequelize.BelongsToManyRemoveAssociationMixin<Visual, VisualId>;
  removeVisual_id_visuals!: Sequelize.BelongsToManyRemoveAssociationsMixin<Visual, VisualId>;
  hasVisual_id_visual!: Sequelize.BelongsToManyHasAssociationMixin<Visual, VisualId>;
  hasVisual_id_visuals!: Sequelize.BelongsToManyHasAssociationsMixin<Visual, VisualId>;
  countVisual_id_visuals!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Listing {
    return Listing.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        subj: {
          type: DataTypes.STRING(4),
          allowNull: false,
        },
        num: {
          type: DataTypes.SMALLINT.UNSIGNED,
          allowNull: false,
        },
        course_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "Courses",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "Listings",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "subj_numb_u",
            unique: true,
            using: "BTREE",
            fields: [{ name: "subj" }, { name: "num" }],
          },
          {
            name: "listing_course_fk_idx",
            using: "BTREE",
            fields: [{ name: "course_id" }],
          },
        ],
      }
    );
  }
}
