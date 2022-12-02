import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { ComboCourse } from "./combo_course";
import type { ComboId } from "./combo";
import type { Listing, ListingId } from "./listing";
import type { Coreq, CoreqId } from "./coreq";

export interface CourseAttributes {
  id: number;
  title: string;
  descr?: string;
  hours: string;
  coreq_id: number;
}

export type CoursePk = "id";
export type CourseId = Course[CoursePk];
export type CourseOptionalAttributes = "descr";
export type CourseCreationAttributes = Optional<
  CourseAttributes,
  CourseOptionalAttributes
>;

export class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  id!: number;
  title!: string;
  descr?: string;
  hours!: string;
  coreq_id!: number;

  // Course hasMany ComboCourse via course_id
  combo_courses!: ComboCourse[];
  getCombo_courses!: Sequelize.HasManyGetAssociationsMixin<ComboCourse>;
  setCombo_courses!: Sequelize.HasManySetAssociationsMixin<
    ComboCourse,
    ComboId
  >;
  addCombo_course!: Sequelize.HasManyAddAssociationMixin<ComboCourse, ComboId>;
  addCombo_courses!: Sequelize.HasManyAddAssociationsMixin<
    ComboCourse,
    ComboId
  >;
  createCombo_course!: Sequelize.HasManyCreateAssociationMixin<ComboCourse>;
  removeCombo_course!: Sequelize.HasManyRemoveAssociationMixin<
    ComboCourse,
    ComboId
  >;
  removeCombo_courses!: Sequelize.HasManyRemoveAssociationsMixin<
    ComboCourse,
    ComboId
  >;
  hasCombo_course!: Sequelize.HasManyHasAssociationMixin<ComboCourse, ComboId>;
  hasCombo_courses!: Sequelize.HasManyHasAssociationsMixin<
    ComboCourse,
    ComboId
  >;
  countCombo_courses!: Sequelize.HasManyCountAssociationsMixin;
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
  // Course belongsTo Coreq via coreq_id
  coreq!: Coreq;
  getCoreq!: Sequelize.BelongsToGetAssociationMixin<Coreq>;
  setCoreq!: Sequelize.BelongsToSetAssociationMixin<Coreq, CoreqId>;
  createCoreq!: Sequelize.BelongsToCreateAssociationMixin<Coreq>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Course {
    return Course.init(
      {
        id: {
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
