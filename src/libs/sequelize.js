import { Sequelize } from "sequelize";
import { config } from "../config/index.js";
import { setupModels } from "../database/models/index.js";

const options = {
  host: config.hostDB,
  dialect: "mysql",
  port: config.portDB,
  timezone: "-06:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      // Read format MySQL to JS
      if (field.type === "DATETIME") {
        return new Date(field.string() + "Z");
      }
      return next();
    },
  },
};

export const sequelize = new Sequelize(
  config.nameDB,
  config.userDB,
  config.passDB,
  options
);

setupModels(sequelize);

sequelize.sync();
