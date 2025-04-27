import { Sequelize } from "sequelize-typescript";
import path from "path";

export default (dbConfig:{host:string, name:string, user:string, password:string}) => {
  return new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mysql",
    logging: false,
    models: [path.resolve(__dirname, '../models')]
  });
};
