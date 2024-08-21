import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const MediosInformacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  television: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  internet: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  redes_sociales: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  publicidad: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  recomendacion: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  otro: {
    type: DataTypes.STRING,
  },
};

export class MediosInformacion extends Model {
  static associate(models) {
    this.hasOne(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "medio_informacion_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.informationMedium,
      modelName: "MediosInformacion",
      timestamps: true,
    };
  }
}
