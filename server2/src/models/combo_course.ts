import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Combo, ComboId } from "./combo";
import type { Course, CourseId } from "./course";

export interface ComboCourseAttributes {
  combo_id: number;
  course_id: number;
}

export type ComboCourseCreationAttributes = ComboCourseAttributes;

export class ComboCourse
  extends Model<ComboCourseAttributes, ComboCourseCreationAttributes>
  implements ComboCourseAttributes
{
  combo_id!: number;
  course_id!: number;

  // ComboCourse belongsTo Combo via combo_id
  combo!: Combo;
  getCombo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setCombo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createCombo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // ComboCourse belongsTo Course via course_id
  course!: Course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<Course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<Course, CourseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<Course>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ComboCourse {
    return ComboCourse.init(
      {
        combo_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "Combos",
            key: "id",
          },
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
        tableName: "ComboCourses",
        timestamps: false,
        indexes: [
          {
            name: "combo_course_combo_fk_idx",
            using: "BTREE",
            fields: [{ name: "combo_id" }],
          },
          {
            name: "combo_course_course_fk_idx",
            using: "BTREE",
            fields: [{ name: "course_id" }],
          },
        ],
      }
    );
  }
}
