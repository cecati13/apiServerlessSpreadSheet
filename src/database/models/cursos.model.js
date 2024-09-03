import { Model, DataTypes, Sequelize } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const CursosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_curso_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.coursesNames,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  tipo_curso: {
    allowNull: false,
    type: DataTypes.ENUM(
      "extension",
      "EBC",
      "escolarizado",
      "ECI",
      "PPF",
      "CTM",
      "CTB"
    ),
  },
  fecha_inicio: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fecha_termino: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  hora_inicio: {
    type: DataTypes.TIME,
  },
  hora_termino: {
    type: DataTypes.TIME,
  },
  costo: {
    allowNull: false,
    type: DataTypes.DECIMAL(5, 2),
  },
  dias_clases: {
    type: DataTypes.STRING,
  },
  profesor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.profesors,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  horas: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
  modalidad: {
    type: DataTypes.STRING,
  },
  capacidad: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
  total_inscripciones: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    defaultValue: 0,
  },
  observaciones: {
    type: DataTypes.STRING,
  },
};

export class Cursos extends Model {
  static associate(models) {
    this.hasMany(models.Inscripciones, {
      as: "cursos",
      foreignKey: "cursos_id",
    });
    this.belongsTo(models.NombresCursos, {
      as: "nombresCursos",
      foreignKey: "id",
    });
    this.belongsTo(models.Profesores, { as: "profesores", foreignKey: "id" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.courses,
      modelName: "Cursos",
      timestamps: true,
      timezone: '-06:00'
    };
  }
}
