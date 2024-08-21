import { Model, DataTypes } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const EstudiantesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  matricula_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.numberControls,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  curp: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  apellido_paterno: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellido_materno: {
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fecha_nacimiento: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  domicilio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.address,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  rfc: {
    type: DataTypes.STRING,
  },
  sexo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  telefono: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  nacionalidad: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Mexicana",
  },
  padecimiento: {
    type: DataTypes.STRING,
  },
  discapacidad: {
    type: DataTypes.STRING,
  },
  pais_nacimiento: {
    type: DataTypes.STRING,
    defaultValue: "Mexico",
  },
  empleos_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.jobs,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  escolaridad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  escolaridad_comprobante: {
    type: DataTypes.STRING,
  },
  tipo_sangre: {
    type: DataTypes.STRING,
  },
  medio_informacion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.informationMedium,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  socioeconomico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.socioeconomic,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  acta_nacimiento: {
    type: DataTypes.STRING,
  },
};

export class Estudiantes extends Model {
  static associate(models) {
    this.belongsTo(models.Matriculas, { as: "matriculas", foreignKey: "id" });
    this.belongsTo(models.Domicilios, { as: "domicilios", foreignKey: "id" });
    this.belongsTo(models.Empleos, { as: "empleos", foreignKey: "id" });
    this.belongsTo(models.MediosInformacion, {
      as: "mediosInformacion",
      foreignKey: "id",
    });
    this.belongsTo(models.Socioeconomicos, {
      as: "socioeconomicos",
      foreignKey: "id",
    });
    this.hasMany(models.Inscripciones, {
      as: "estudiantes",
      foreignKey: "estudiantes_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.students,
      modelName: "Estudiantes",
      timestamps: true,
    };
  }
}
