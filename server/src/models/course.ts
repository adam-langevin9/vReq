import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Coreq, CoreqId } from "./coreq";
import type { Listing, ListingId } from "./listing";

export interface CourseAttributes {
  id: number;
  title: string;
  descr?: string;
  hours: string;
  coreq_id: number;
}

export type CoursePk = "id";
export type CourseId = Course[CoursePk];
export type CourseOptionalAttributes = "id" | "descr";
export type CourseCreationAttributes = Optional<CourseAttributes, CourseOptionalAttributes>;

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  id!: number;
  title!: string;
  descr?: string;
  hours!: string;
  coreq_id!: number;

  // Course belongsTo Coreq via coreq_id
  coreq!: Coreq;
  getCoreq!: Sequelize.BelongsToGetAssociationMixin<Coreq>;
  setCoreq!: Sequelize.BelongsToSetAssociationMixin<Coreq, CoreqId>;
  createCoreq!: Sequelize.BelongsToCreateAssociationMixin<Coreq>;
  // Course hasMany Listing via course_id
  listings!: Listing[];
  getListings!: Sequelize.HasManyGetAssociationsMixin<Listing>;
  setListings!: Sequelize.HasManySetAssociationsMixin<Listing, ListingId>;
  addListing!: Sequelize.HasManyAddAssociationMixin<Listing, ListingId>;
  addListings!: Sequelize.HasManyAddAssociationsMixin<Listing, ListingId>;
  createListing!: Sequelize.HasManyCreateAssociationMixin<Listing>;
  removeListing!: Sequelize.HasManyRemoveAssociationMixin<Listing, ListingId>;
  removeListings!: Sequelize.HasManyRemoveAssociationsMixin<Listing, ListingId>;
  hasListing!: Sequelize.HasManyHasAssociationMixin<Listing, ListingId>;
  hasListings!: Sequelize.HasManyHasAssociationsMixin<Listing, ListingId>;
  countListings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Course {
    return Course.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(85),
          allowNull: false,
        },
        descr: {
          type: DataTypes.STRING(750),
          allowNull: true,
        },
        hours: {
          type: DataTypes.STRING(8),
          allowNull: false,
        },
        coreq_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "Coreqs",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "Courses",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "course_coreq_fk_idx",
            using: "BTREE",
            fields: [{ name: "coreq_id" }],
          },
        ],
      }
    );
  }
}
