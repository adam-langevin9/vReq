import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Combo, ComboId } from './combo';

export interface ComboComboAttributes {
  combo_id: number;
  sub_combo_id: number;
}

export type ComboComboCreationAttributes = ComboComboAttributes;

export class ComboCombo extends Model<ComboComboAttributes, ComboComboCreationAttributes> implements ComboComboAttributes {
  combo_id!: number;
  sub_combo_id!: number;

  // ComboCombo belongsTo Combo via combo_id
  combo!: Combo;
  getCombo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setCombo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createCombo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;
  // ComboCombo belongsTo Combo via sub_combo_id
  sub_combo!: Combo;
  getSub_combo!: Sequelize.BelongsToGetAssociationMixin<Combo>;
  setSub_combo!: Sequelize.BelongsToSetAssociationMixin<Combo, ComboId>;
  createSub_combo!: Sequelize.BelongsToCreateAssociationMixin<Combo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ComboCombo {
    return ComboCombo.init({
    combo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Combos',
        key: 'id'
      }
    },
    sub_combo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Combos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ComboCombos',
    timestamps: false,
    indexes: [
      {
        name: "combo_combo_combo_fk_idx",
        using: "BTREE",
        fields: [
          { name: "combo_id" },
        ]
      },
      {
        name: "combo_combo_sub_combo_fk_idx",
        using: "BTREE",
        fields: [
          { name: "sub_combo_id" },
        ]
      },
    ]
  });
  }
}
