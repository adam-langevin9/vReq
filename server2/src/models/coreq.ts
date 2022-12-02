import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Req, ReqId } from './req';

export interface CoreqAttributes {
  id: number;
  prereq_id?: number;
  precoreq_id?: number;
}

export type CoreqPk = "id";
export type CoreqId = Coreq[CoreqPk];
export type CoreqOptionalAttributes = "prereq_id" | "precoreq_id";
export type CoreqCreationAttributes = Optional<CoreqAttributes, CoreqOptionalAttributes>;

export class Coreq extends Model<CoreqAttributes, CoreqCreationAttributes> implements CoreqAttributes {
  id!: number;
  prereq_id?: number;
  precoreq_id?: number;

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
    return Coreq.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    prereq_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Reqs',
        key: 'id'
      }
    },
    precoreq_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Reqs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Coreqs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "CoreqGroup_prereq_fk_idx",
        using: "BTREE",
        fields: [
          { name: "prereq_id" },
        ]
      },
      {
        name: "CoreqGroup_precoreq_fk_idx",
        using: "BTREE",
        fields: [
          { name: "precoreq_id" },
        ]
      },
    ]
  });
  }
}
