import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const MotivosEleccionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  autoempleo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  ahorro_hogar: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  esperar_otra_institucion: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  tiempo_libre: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  mejorar_trabajo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  otro: {
    type: DataTypes.STRING,
  },
};

export class MotivosEleccion extends Model {
  static associate(models) {
    this.hasOne(models.Inscripciones, {
      as: "motivosEleccion",
      foreignKey: "motivos_eleccion_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.reasonCourseChoises,
      modelName: "MotivosEleccion",
      timestamps: true,
    };
  }
}
