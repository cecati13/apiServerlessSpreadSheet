import { Model, DataTypes, Sequelize } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const DomiciliosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  calle: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  colonia: {
    type: DataTypes.STRING,
  },
  municipio_alcaldia: {
    type: DataTypes.STRING,
  },
  cp: {
    type: DataTypes.CHAR(5),
  },

  estado: {
    type: DataTypes.STRING,
  },
  comprobante_domicilio: {
    type: DataTypes.STRING,
  },
};

export class Domicilios extends Model {
  static associate(models) {
    this.hasOne(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "domicilio_id",
    });
    this.hasOne(models.Empleos, {
      as: "empleos",
      foreignKey: "domicilio_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.address,
      modelName: "Domicilios",
      timestamps: true,
      timezone: '-06:00'
    };
  }

  static fieldsUpdateForStudent = [
    "calle",
    "numero",
    "colonia",
    "municipio",
    "cp",
    "estado",
    "comprobanteDomicilio",
  ];

  static conexionFields(obj){
    return {
      calle: obj.calle,
      numero: obj.numero,
      colonia: obj.colonia,
      municipio_alcaldia: obj.municipio,
      cp: obj.cp,
      estado: obj.estado,
      comprobante_domicilio: obj.comprobanteDomicilio,
    }
  }
}
