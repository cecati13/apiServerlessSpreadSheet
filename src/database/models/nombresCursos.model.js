import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const NombresCursosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  especialidad_id: {
    type: DataTypes.SMALLINT,
    references: {
      model: tablesDB.specialties,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  nombre: {
    type: DataTypes.STRING,
  },
  informacion: {
    type: DataTypes.TEXT,
  },
};

export class NombresCursos extends Model {
  static associate(models) {
    this.hasOne(models.Cursos, {
      as: "cursos",
      foreignKey: "nombre_curso_id",
    });
    this.belongsTo(models.Especialidades, {
      as: "especialidades",
      foreignKey: "id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.coursesNames,
      modelName: "NombresCursos",
      timestamps: true,
    };
  }
}
