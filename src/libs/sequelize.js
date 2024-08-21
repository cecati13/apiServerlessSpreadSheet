import { Sequelize } from "sequelize";
import { config } from "../config/index.js";
import { setupModels } from "../database/models/index.js";

const URI = `mysql://${config.userDB}:${config.passDB}@${config.hostDB}:${config.portDB}/${config.nameDB}`;

export const sequelize = new Sequelize(URI, {
  dialect: "mysql",
});

setupModels(sequelize);

sequelize.sync();
