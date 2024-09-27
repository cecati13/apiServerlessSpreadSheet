import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const StatusPagosSchema = {
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

export class StatusPagos extends Model {
  static associate(models) {
    this.hasOne(models.Inscripciones, {
      as: "statusPagos",
      foreignKey: "status_pagos_id",
    });
    this.belongsTo(models.Users, { as: "users", foreignKey: "id" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.paymentStatus,
      modelName: "StatusPagos",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
