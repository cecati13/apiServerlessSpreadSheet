import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const StatusInscripcionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.users,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
};

export class StatusInscripciones extends Model {
  static associate(models) {
    this.hasOne(models.Inscripciones, {
      as: "statusInscripciones",
      foreignKey: "status_inscripciones_id",
    });
    this.belongsTo(models.Users, { as: "users", foreignKey: "id" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.inscriptionStatus,
      modelName: "StatusInscripciones",
      timestamps: true,
    };
  }
}
