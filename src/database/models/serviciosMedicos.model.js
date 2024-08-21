import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const ServiciosMedicosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  ninguno: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: true,
  },
  issste: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  imss: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  privado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  seguro_popular: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  otro: {
    type: DataTypes.STRING,
  },
};

export class ServiciosMedicos extends Model {
  static associate(models) {
    this.hasOne(models.Socioeconomicos, {
      as: "socioeconomicos",
      foreignKey: "servicios_medicos_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.medicalServices,
      modelName: "ServiciosMedicos",
      timestamps: true,
    };
  }
}
