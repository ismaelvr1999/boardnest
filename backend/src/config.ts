import * as awilix from "awilix";
import { config } from "dotenv";
const { Lifetime } = awilix;
config();

const PORT = process.env.PORT || 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
}

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
    strict: true,
});
export default container;

container.register({
    dbConfig: awilix.asValue(dbConfig),
    serverPort: awilix.asValue(PORT)
})
// Sequelize singleton and debugging varible
container.register({
    debugging: awilix.asValue(process.env.NODE_ENV === "development"),
    sequelize: awilix.asFunction(require("./db/connection").default, {
      lifetime: Lifetime.SINGLETON,
    }),
  });
  
