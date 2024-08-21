import { Model, DataTypes, Sequelize } from "sequelize";
import { tablesDB } from "../tablesDB.js";

export const EmpleosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  antiguedad: {
    type: DataTypes.DECIMAL(4, 2),
  },
  domicilio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: tablesDB.address,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  situacion_laboral: {
    type: DataTypes.STRING,
  },
  ocupacion_principal: {
    field: "ocupacion_principal",
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.INTEGER,
  },
  nombre_jefe: {
    type: DataTypes.STRING,
  },
  puesto: {
    type: DataTypes.STRING,
  },
};

export class Empleos extends Model {
  static associate(models) {
    this.hasOne(models.Estudiantes, {
      as: "estudiantes",
      foreignKey: "empleos_id"
    })
    this.belongsTo(models.Domicilios, { as: "domicilios", foreignKey: "id"  });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tablesDB.jobs,
      modelName: "Empleos",
      timestamps: true,
    };
  }
}
