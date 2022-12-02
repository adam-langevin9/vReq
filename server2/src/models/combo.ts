import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { ComboCombo } from "./combo_combo";
import type { ComboCourse } from "./combo_course";
import type { CourseId } from "./course";
import type { Node } from "./node";
import type { Req, ReqId } from "./req";
import type { Visual, VisualId } from "./visual";

export interface ComboAttributes {
  id: number;
  op: "AND" | "OR" | "NOT" | "ONE";
}

export type ComboPk = "id";
export type ComboId = Combo[ComboPk];
export type ComboCreationAttributes = ComboAttributes;

export class Combo
  extends Model<ComboAttributes, ComboCreationAttributes>
  implements ComboAttributes
{
  id!: number;
  op!: "AND" | "OR" | "NOT" | "ONE";

  // Combo hasMany ComboCombo via sub_combo_id
  combo_combos!: ComboCombo[];
  getCombo_combos!: Sequelize.HasManyGetAssociationsMixin<ComboCombo>;
  setCombo_combos!: Sequelize.HasManySetAssociationsMixin<ComboCombo, ComboId>;
  addCombo_combo!: Sequelize.HasManyAddAssociationMixin<ComboCombo, ComboId>;
  addCombo_combos!: Sequelize.HasManyAddAssociationsMixin<ComboCombo, ComboId>;
  createCombo_combo!: Sequelize.HasManyCreateAssociationMixin<ComboCombo>;
  removeCombo_combo!: Sequelize.HasManyRemoveAssociationMixin<
    ComboCombo,
    ComboId
  >;
  removeCombo_combos!: Sequelize.HasManyRemoveAssociationsMixin<
    ComboCombo,
    ComboId
  >;
  hasCombo_combo!: Sequelize.HasManyHasAssociationMixin<ComboCombo, ComboId>;
  hasCombo_combos!: Sequelize.HasManyHasAssociationsMixin<ComboCombo, ComboId>;
  countCombo_combos!: Sequelize.HasManyCountAssociationsMixin;
  // Combo HasMany ComboCourse via combo_id
  combo_courses!: ComboCourse[];
  getCombo_courses!: Sequelize.HasManyGetAssociationsMixin<ComboCourse>;
  setCombo_courses!: Sequelize.HasManySetAssociationsMixin<
    ComboCourse,
    CourseId
  >;
  addCombo_course!: Sequelize.HasManyAddAssociationMixin<ComboCourse, CourseId>;
  addCombo_courses!: Sequelize.HasManyAddAssociationsMixin<
    ComboCourse,
    CourseId
  >;
  createCombo_course!: Sequelize.HasManyCreateAssociationMixin<ComboCourse>;
  removeCombo_course!: Sequelize.HasManyRemoveAssociationMixin<
    ComboCourse,
    CourseId
  >;
  removeCombo_courses!: Sequelize.HasManyRemoveAssociationsMixin<
    ComboCourse,
    CourseId
  >;
  hasCombo_course!: Sequelize.HasManyHasAssociationMixin<ComboCourse, CourseId>;
  hasCombo_courses!: Sequelize.HasManyHasAssociationsMixin<
    ComboCourse,
    CourseId
  >;
  countCombo_courses!: Sequelize.HasManyCountAssociationsMixin;
  // Combo HasMany Node via selected_prereqs or selected_precoreqs
  nodes!: Node[];
  getNodes!: Sequelize.HasManyGetAssociationsMixin<Node>;
  createNode!: Sequelize.HasManyCreateAssociationMixin<Node>;
  countNodes!: Sequelize.HasManyCountAssociationsMixin;
  // Combo hasMany Req via combo_id
  reqs!: Req[];
  getReqs!: Sequelize.HasManyGetAssociationsMixin<Req>;
  setReqs!: Sequelize.HasManySetAssociationsMixin<Req, ReqId>;
  addReq!: Sequelize.HasManyAddAssociationMixin<Req, ReqId>;
  addReqs!: Sequelize.HasManyAddAssociationsMixin<Req, ReqId>;
  createReq!: Sequelize.HasManyCreateAssociationMixin<Req>;
  removeReq!: Sequelize.HasManyRemoveAssociationMixin<Req, ReqId>;
  removeReqs!: Sequelize.HasManyRemoveAssociationsMixin<Req, ReqId>;
  hasReq!: Sequelize.HasManyHasAssociationMixin<Req, ReqId>;
  hasReqs!: Sequelize.HasManyHasAssociationsMixin<Req, ReqId>;
  countReqs!: Sequelize.HasManyCountAssociationsMixin;
  // Combo HasMany Visual via selected_reqs
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Combo {
    return Combo.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        op: {
          type: DataTypes.ENUM("AND", "OR", "NOT", "ONE"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Combos",
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
