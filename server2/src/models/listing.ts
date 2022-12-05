import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Course, CourseId } from "./course";
import type { Node } from "./node";
import { VisualId } from "./visual";

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
  setNodes!: Sequelize.HasManySetAssociationsMixin<Node, VisualId>;
  addNode!: Sequelize.HasManyAddAssociationMixin<Node, VisualId>;
  addNodes!: Sequelize.HasManyAddAssociationsMixin<Node, VisualId>;
  createNode!: Sequelize.HasManyCreateAssociationMixin<Node>;
  removeNode!: Sequelize.HasManyRemoveAssociationMixin<Node, VisualId>;
  removeNodes!: Sequelize.HasManyRemoveAssociationsMixin<Node, VisualId>;
  hasNode!: Sequelize.HasManyHasAssociationMixin<Node, VisualId>;
  hasNodes!: Sequelize.HasManyHasAssociationsMixin<Node, VisualId>;
  countNodes!: Sequelize.HasManyCountAssociationsMixin;

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
