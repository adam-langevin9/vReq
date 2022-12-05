import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { ComboCoreq, ComboCoreqId } from "./combo_coreq";
import type { Combo, ComboId } from "./combo";
import type { Course, CourseId } from "./course";
import type { Req, ReqId } from "./req";

export interface CoreqAttributes {
  id: number;
  prereq_id?: number;
  precoreq_id?: number;
}

export type CoreqPk = "id";
export type CoreqId = Coreq[CoreqPk];
export type CoreqOptionalAttributes = "id" | "prereq_id" | "precoreq_id";
export type CoreqCreationAttributes = Optional<CoreqAttributes, CoreqOptionalAttributes>;

export class Coreq extends Model<CoreqAttributes, CoreqCreationAttributes> implements CoreqAttributes {
  id!: number;
  prereq_id?: number;
  precoreq_id?: number;

  // Coreq hasMany ComboCoreq via coreq_id
  combo_coreqs!: ComboCoreq[];
  getCombo_coreqs!: Sequelize.HasManyGetAssociationsMixin<ComboCoreq>;
  setCombo_coreqs!: Sequelize.HasManySetAssociationsMixin<ComboCoreq, ComboCoreqId>;
  addCombo_coreq!: Sequelize.HasManyAddAssociationMixin<ComboCoreq, ComboCoreqId>;
  addCombo_coreqs!: Sequelize.HasManyAddAssociationsMixin<ComboCoreq, ComboCoreqId>;
  createCombo_coreq!: Sequelize.HasManyCreateAssociationMixin<ComboCoreq>;
  removeCombo_coreq!: Sequelize.HasManyRemoveAssociationMixin<ComboCoreq, ComboCoreqId>;
  removeCombo_coreqs!: Sequelize.HasManyRemoveAssociationsMixin<ComboCoreq, ComboCoreqId>;
  hasCombo_coreq!: Sequelize.HasManyHasAssociationMixin<ComboCoreq, ComboCoreqId>;
  hasCombo_coreqs!: Sequelize.HasManyHasAssociationsMixin<ComboCoreq, ComboCoreqId>;
  countCombo_coreqs!: Sequelize.HasManyCountAssociationsMixin;
  // Coreq belongsToMany Combo via coreq_id and combo_id
  combo_id_combos_combo_coreqs!: Combo[];
  getCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManyGetAssociationsMixin<Combo>;
  setCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManySetAssociationsMixin<Combo, ComboId>;
  addCombo_id_combos_combo_coreq!: Sequelize.BelongsToManyAddAssociationMixin<Combo, ComboId>;
  addCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManyAddAssociationsMixin<Combo, ComboId>;
  createCombo_id_combos_combo_coreq!: Sequelize.BelongsToManyCreateAssociationMixin<Combo>;
  removeCombo_id_combos_combo_coreq!: Sequelize.BelongsToManyRemoveAssociationMixin<Combo, ComboId>;
  removeCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManyRemoveAssociationsMixin<Combo, ComboId>;
  hasCombo_id_combos_combo_coreq!: Sequelize.BelongsToManyHasAssociationMixin<Combo, ComboId>;
  hasCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManyHasAssociationsMixin<Combo, ComboId>;
  countCombo_id_combos_combo_coreqs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Coreq hasMany Course via coreq_id
  courses!: Course[];
  getCourses!: Sequelize.HasManyGetAssociationsMixin<Course>;
  setCourses!: Sequelize.HasManySetAssociationsMixin<Course, CourseId>;
  addCourse!: Sequelize.HasManyAddAssociationMixin<Course, CourseId>;
  addCourses!: Sequelize.HasManyAddAssociationsMixin<Course, CourseId>;
  createCourse!: Sequelize.HasManyCreateAssociationMixin<Course>;
  removeCourse!: Sequelize.HasManyRemoveAssociationMixin<Course, CourseId>;
  removeCourses!: Sequelize.HasManyRemoveAssociationsMixin<Course, CourseId>;
  hasCourse!: Sequelize.HasManyHasAssociationMixin<Course, CourseId>;
  hasCourses!: Sequelize.HasManyHasAssociationsMixin<Course, CourseId>;
  countCourses!: Sequelize.HasManyCountAssociationsMixin;
  // Coreq belongsTo Req via precoreq_id
  precoreq!: Req;
  getPrecoreq!: Sequelize.BelongsToGetAssociationMixin<Req>;
  setPrecoreq!: Sequelize.BelongsToSetAssociationMixin<Req, ReqId>;
  createPrecoreq!: Sequelize.BelongsToCreateAssociationMixin<Req>;
  // Coreq belongsTo Req via prereq_id
  prereq!: Req;
  getPrereq!: Sequelize.BelongsToGetAssociationMixin<Req>;
  setPrereq!: Sequelize.BelongsToSetAssociationMixin<Req, ReqId>;
  createPrereq!: Sequelize.BelongsToCreateAssociationMixin<Req>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Coreq {
    return Coreq.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        prereq_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Reqs",
            key: "id",
          },
        },
        precoreq_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "Reqs",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "Coreqs",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "CoreqGroup_prereq_fk_idx",
            using: "BTREE",
            fields: [{ name: "prereq_id" }],
          },
          {
            name: "CoreqGroup_precoreq_fk_idx",
            using: "BTREE",
            fields: [{ name: "precoreq_id" }],
          },
        ],
      }
    );
  }
}
