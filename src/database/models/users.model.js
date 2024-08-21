import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const UsersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  nombre_completo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export class Users extends Model {
  static associate(models) {
    this.hasOne(models.StatusInscripciones, {
      as: "statusInscripciones",
      foreignKey: "user_id",
    });
    this.hasOne(models.StatusPagos, {
      as: "statusPagos",
      foreignKey: "user_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.users,
      modelName: "Users",
      timestamps: true,
    };
  }
}
