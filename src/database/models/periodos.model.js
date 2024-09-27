import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const PeriodosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.SMALLINT,
  },
  num_periodo: {
    allowNull: false,
    type: DataTypes.ENUM("1", "2", "3", "4"),
  },
  annio: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
};

export class Periodos extends Model {
  static associate(models) {
    this.hasOne(models.Inscripciones, {
      as: "periodos",
      foreignKey: "periodo_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.periods,
      modelName: "Periodos",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
