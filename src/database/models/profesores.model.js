import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const ProfesorsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellido_paterno: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellido_materno: {
    type: DataTypes.STRING,
  },
};

export class Profesores extends Model {
  static associate(models) {
    this.hasOne(models.Cursos, {
      as: "cursos",
      foreignKey: "profesor_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.profesors,
      modelName: "Profesores",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
