import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const BienesServiciosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  lavadora: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  celular: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  computadora: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  automovil: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  calentador_agua: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  linea_telefonica: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  tv_cable: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  aspiradora: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  tostadora: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
  persona_servicio: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
};

export class BienesServicios extends Model {
  static associate(models) {
    this.hasOne(models.Socioeconomicos, {
      as: "socioeconomicos",
      foreignKey: "bienes_servicios_id"
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.belongings,
      modelName: "BienesServicios",
      timestamps: true,
    };
  }
}
