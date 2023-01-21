import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { Combo, ComboId } from "./combo";
import type { Coreq, CoreqId } from "./coreq";

export interface ComboCoreqAttributes {
  combo_id: number;
  coreq_id: number;
}

export type ComboCoreqPk = "combo_id" | "coreq_id";
export type ComboCoreqId = ComboCoreq[ComboCoreqPk];
export type ComboCoreqCreationAttributes = ComboCoreqAttributes;

export class ComboCoreq
  extends Model<ComboCoreqAttributes, ComboCoreqCreationAttributes>
  implements ComboCoreqAttributes
{
  combo_id!: number;
  coreq_id!: number;

  // ComboCoreq belongsTo Combo via combo_id
  combo!: Combo;
  getCombo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setCombo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createCombo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // ComboCoreq belongsTo Coreq via coreq_id
  coreq!: Coreq;
  getCoreq!: Sequelize.BelongsToGetAssociationMixin<Coreq>;
  setCoreq!: Sequelize.BelongsToSetAssociationMixin<Coreq, CoreqId>;
  createCoreq!: Sequelize.BelongsToCreateAssociationMixin<Coreq>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ComboCoreq {
    return ComboCoreq.init(
      {
        combo_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "Combos",
            key: "id",
          },
        },
        coreq_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "Coreqs",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "ComboCoreqs",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "combo_id" }, { name: "coreq_id" }],
          },
          {
            name: "combo_course_combo_fk_idx",
            using: "BTREE",
            fields: [{ name: "combo_id" }],
          },
          {
            name: "combo_coreq_coreq_fk_idx",
            using: "BTREE",
            fields: [{ name: "coreq_id" }],
          },
        ],
      }
    );
  }
}
