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
    type: DataTypes.STRING(18),
    collate: 'utf8mb4_bin',
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
    type: DataTypes.STRING,
  },
  email: {
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
      timezone: '-06:00'
    };
  }

  static fieldsUpdateForStudent = [
    "rfc",
    "telefono",
    "telefono",
    "email",
    "padecimiento",
    "discapacidad",
    "escolaridad",
    "escolaridad_comprobante",
    "tipo_sangre",
  ];

  static conexionFields(obj, matricula, domicilio){
    //Create Empleos, Medio-Informacion and Socioeconomico before Estudiantes.
    return {
      matricula_id: matricula.id,
      curp: obj.curp,
      apellido_paterno: obj.a_paterno,
      apellido_materno: obj.a_materno,
      nombre: obj.nombre,
      fecha_nacimiento: obj.fechaNacimiento,
      domicilio_id: domicilio.id,
      rfc: obj.rfc,
      sexo: obj.genero,
      telefono: obj.telefono,
      email: obj.email,
      nacionalidad: obj.nacionalidad,
      padecimiento: obj.padecimiento,
      discapacidad: obj.discapacidad,
      pais_nacimiento: obj.paisNacimiento,
      empleos_id: null,
      escolaridad: obj.escolaridad,
      escolaridad_comprobante: obj.comprobanteEstudios,
      tipo_sangre: obj.sangre,
      medio_informacion_id: null,
      socioeconomico_id: null,
      acta_nacimiento: obj.actaNacimiento,
    }
  }
}
