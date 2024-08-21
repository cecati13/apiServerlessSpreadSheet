import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const MatriculasSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  numero_matricula: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  annio: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
};

export class Matriculas extends Model {
  static associate(models) {
    this.hasOne(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "matricula_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.numberControls,
      modelName: "Matriculas",
      timestamps: true,
    };
  }
}
