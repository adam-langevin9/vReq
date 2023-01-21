import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { ComboCombo, ComboComboId } from "./combo_combo";
import type { ComboCoreq, ComboCoreqId } from "./combo_coreq";
import type { Coreq, CoreqId } from "./coreq";
import type { Node } from "./node";
import type { Req, ReqId } from "./req";
import type { Visual, VisualId } from "./visual";

export interface ComboAttributes {
  id: number;
  op: "AND" | "OR" | "ONE";
}

export type ComboPk = "id";
export type ComboId = Combo[ComboPk];
export type ComboCreationAttributes = ComboAttributes;

export class Combo extends Model<ComboAttributes, ComboCreationAttributes> implements ComboAttributes {
  id!: number;
  op!: "AND" | "OR" | "ONE";

  // Combo hasMany ComboCombo via combo_id
  combo_combos!: ComboCombo[];
  getCombo_combos!: Sequelize.HasManyGetAssociationsMixin<ComboCombo>;
  setCombo_combos!: Sequelize.HasManySetAssociationsMixin<ComboCombo, ComboComboId>;

  addCombo_combo!: Sequelize.HasManyAddAssociationMixin<ComboCombo, ComboComboId>;

  addCombo_combos!: Sequelize.HasManyAddAssociationsMixin<ComboCombo, ComboComboId>;

  createCombo_combo!: Sequelize.HasManyCreateAssociationMixin<ComboCombo>;
  removeCombo_combo!: Sequelize.HasManyRemoveAssociationMixin<ComboCombo, ComboComboId>;

  removeCombo_combos!: Sequelize.HasManyRemoveAssociationsMixin<ComboCombo, ComboComboId>;

  hasCombo_combo!: Sequelize.HasManyHasAssociationMixin<ComboCombo, ComboComboId>;

  hasCombo_combos!: Sequelize.HasManyHasAssociationsMixin<ComboCombo, ComboComboId>;

  countCombo_combos!: Sequelize.HasManyCountAssociationsMixin;
  // Combo hasMany ComboCombo via sub_combo_id
  sub_combo_combo_combos!: ComboCombo[];
  getSub_combo_combo_combos!: Sequelize.HasManyGetAssociationsMixin<ComboCombo>;
  setSub_combo_combo_combos!: Sequelize.HasManySetAssociationsMixin<ComboCombo, ComboComboId>;

  addSub_combo_combo_combo!: Sequelize.HasManyAddAssociationMixin<ComboCombo, ComboComboId>;

  addSub_combo_combo_combos!: Sequelize.HasManyAddAssociationsMixin<ComboCombo, ComboComboId>;

  createSub_combo_combo_combo!: Sequelize.HasManyCreateAssociationMixin<ComboCombo>;
  removeSub_combo_combo_combo!: Sequelize.HasManyRemoveAssociationMixin<ComboCombo, ComboComboId>;

  removeSub_combo_combo_combos!: Sequelize.HasManyRemoveAssociationsMixin<ComboCombo, ComboComboId>;

  hasSub_combo_combo_combo!: Sequelize.HasManyHasAssociationMixin<ComboCombo, ComboComboId>;

  hasSub_combo_combo_combos!: Sequelize.HasManyHasAssociationsMixin<ComboCombo, ComboComboId>;

  countSub_combo_combo_combos!: Sequelize.HasManyCountAssociationsMixin;
  // Combo hasMany ComboCoreq via combo_id
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
  // Combo belongsToMany Combo via combo_id and sub_combo_id
  sub_combo_id_combos!: Combo[];
  getSub_combo_id_combos!: Sequelize.BelongsToManyGetAssociationsMixin<Combo>;
  setSub_combo_id_combos!: Sequelize.BelongsToManySetAssociationsMixin<Combo, ComboId>;

  addSub_combo_id_combo!: Sequelize.BelongsToManyAddAssociationMixin<Combo, ComboId>;

  addSub_combo_id_combos!: Sequelize.BelongsToManyAddAssociationsMixin<Combo, ComboId>;

  createSub_combo_id_combo!: Sequelize.BelongsToManyCreateAssociationMixin<Combo>;
  removeSub_combo_id_combo!: Sequelize.BelongsToManyRemoveAssociationMixin<Combo, ComboId>;

  removeSub_combo_id_combos!: Sequelize.BelongsToManyRemoveAssociationsMixin<Combo, ComboId>;

  hasSub_combo_id_combo!: Sequelize.BelongsToManyHasAssociationMixin<Combo, ComboId>;

  hasSub_combo_id_combos!: Sequelize.BelongsToManyHasAssociationsMixin<Combo, ComboId>;

  countSub_combo_id_combos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Combo belongsToMany Combo via sub_combo_id and combo_id
  combo_id_combos!: Combo[];
  getCombo_id_combos!: Sequelize.BelongsToManyGetAssociationsMixin<Combo>;
  setCombo_id_combos!: Sequelize.BelongsToManySetAssociationsMixin<Combo, ComboId>;

  addCombo_id_combo!: Sequelize.BelongsToManyAddAssociationMixin<Combo, ComboId>;

  addCombo_id_combos!: Sequelize.BelongsToManyAddAssociationsMixin<Combo, ComboId>;

  createCombo_id_combo!: Sequelize.BelongsToManyCreateAssociationMixin<Combo>;
  removeCombo_id_combo!: Sequelize.BelongsToManyRemoveAssociationMixin<Combo, ComboId>;

  removeCombo_id_combos!: Sequelize.BelongsToManyRemoveAssociationsMixin<Combo, ComboId>;

  hasCombo_id_combo!: Sequelize.BelongsToManyHasAssociationMixin<Combo, ComboId>;

  hasCombo_id_combos!: Sequelize.BelongsToManyHasAssociationsMixin<Combo, ComboId>;

  countCombo_id_combos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Combo belongsToMany Coreq via combo_id and coreq_id
  coreq_id_coreqs!: Coreq[];
  getCoreq_id_coreqs!: Sequelize.BelongsToManyGetAssociationsMixin<Coreq>;
  setCoreq_id_coreqs!: Sequelize.BelongsToManySetAssociationsMixin<Coreq, CoreqId>;

  addCoreq_id_coreq!: Sequelize.BelongsToManyAddAssociationMixin<Coreq, CoreqId>;

  addCoreq_id_coreqs!: Sequelize.BelongsToManyAddAssociationsMixin<Coreq, CoreqId>;

  createCoreq_id_coreq!: Sequelize.BelongsToManyCreateAssociationMixin<Coreq>;
  removeCoreq_id_coreq!: Sequelize.BelongsToManyRemoveAssociationMixin<Coreq, CoreqId>;

  removeCoreq_id_coreqs!: Sequelize.BelongsToManyRemoveAssociationsMixin<Coreq, CoreqId>;

  hasCoreq_id_coreq!: Sequelize.BelongsToManyHasAssociationMixin<Coreq, CoreqId>;

  hasCoreq_id_coreqs!: Sequelize.BelongsToManyHasAssociationsMixin<Coreq, CoreqId>;

  countCoreq_id_coreqs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Combo hasMany Node via selected_precoreqs
  nodes!: Node[];
  getNodes!: Sequelize.HasManyGetAssociationsMixin<Node>;
  createNode!: Sequelize.HasManyCreateAssociationMixin<Node>;
  countNodes!: Sequelize.HasManyCountAssociationsMixin;
  // Combo hasMany Node via selected_prereqs
  selected_prereqs_nodes!: Node[];
  getSelected_prereqs_nodes!: Sequelize.HasManyGetAssociationsMixin<Node>;
  createSelected_prereqs_node!: Sequelize.HasManyCreateAssociationMixin<Node>;
  countSelected_prereqs_nodes!: Sequelize.HasManyCountAssociationsMixin;
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
  // Combo hasMany Visual via selected_reqs
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
          type: DataTypes.ENUM("AND", "OR", "ONE"),
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
