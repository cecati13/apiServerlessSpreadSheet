import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const EspecialidadesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.SMALLINT,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  logo_url: {
    type: DataTypes.STRING,
  },
};

export class Especialidades extends Model {
  static associate(models) {
    this.hasMany(models.NombresCursos, {
      as: "nombreCursos",
      foreignKey: "especialidad_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.specialties,
      modelName: "Especialidades",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
