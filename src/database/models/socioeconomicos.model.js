import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const SocioeconomicosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  total_personas_casa: {
    type: DataTypes.SMALLINT,
  },
  ingresos_sm: {
    type: DataTypes.ENUM("1", "2", "3", "4", "5"),
  },
  bienes_servicios_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.belongings,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  servicios_medicos_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.medicalServices,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

export class Socioeconomicos extends Model {
  static associate(models) {
    this.belongsTo(models.BienesServicios, {
      as: "bienesServicios",
      foreignKey: "id",
    });
    this.belongsTo(models.ServiciosMedicos, {
      as: "serviciosMedicos",
      foreignKey: "id",
    });
    this.hasOne(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "socioeconomico_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.socioeconomic,
      modelName: "Socioeconomicos",
      timestamps: true,
    };
  }
}
