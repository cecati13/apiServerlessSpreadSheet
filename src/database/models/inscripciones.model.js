import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const InscripcionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  status_inscripciones_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.inscriptionStatus,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  status_pagos_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.paymentStatus,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  periodo_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: tablesDB.periods,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  estudiantes_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.students,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  cursos_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.courses,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  motivos_eleccion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.reasonCourseChoises,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

export class Inscripciones extends Model {
  static associate(models) {
    this.belongsTo(models.StatusInscripciones, {
      as: "statusInscripciones",
      foreignKey: "id",
    });
    this.belongsTo(models.StatusPagos, {
      as: "statusPagos",
      foreignKey: "id",
    });
    this.belongsTo(models.Periodos, {
      as: "periodos",
      foreignKey: "id",
    });
    this.belongsTo(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "id",
    });
    this.belongsTo(models.Cursos, {
      as: "cursos",
      foreignKey: "id",
    });
    this.belongsTo(models.MotivosEleccion, {
      as: "motivosEleccion",
      foreignKey: "id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.inscriptions,
      modelName: "Inscripciones",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
