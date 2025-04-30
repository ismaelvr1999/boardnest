import * as awilix from "awilix";
import { config } from "dotenv";
const { Lifetime } = awilix;
config();
const {
  PORT = 3000,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
};

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
  strict: true,
});
export default container;

container.register({
  User: awilix.asFunction(require("./models/user").default),
  Board: awilix.asFunction(require("./models/board").default)
})

container.register({
  dbConfig: awilix.asValue(dbConfig),
  serverPort: awilix.asValue(PORT),
  jwtSecret: awilix.asValue(JWT_SECRET)
});
// Sequelize singleton and debugging varible
container.register({
  debugging: awilix.asValue(NODE_ENV === "development"),
  sequelize: awilix.asFunction(require("./db/connection").default, {
    lifetime: Lifetime.SINGLETON,
  }),
});

container.register({
  usersService: awilix.asClass(require("./services/users").default),
  boardsService: awilix.asClass(require("./services/boards").default)
});

container.register({
  usersController: awilix.asClass(require("./controllers/user").default),
  boardsController: awilix.asClass(require("./controllers/boards").default)
});
