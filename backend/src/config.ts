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
  FRONTEND_URL
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
//ENV
container.register({
  dbConfig: awilix.asValue(dbConfig),
  serverPort: awilix.asValue(PORT),
  jwtSecret: awilix.asValue(JWT_SECRET),
  frontendURL: awilix.asValue(FRONTEND_URL)

});
// Sequelize singleton and debugging varible
container.register({
  debugging: awilix.asValue(NODE_ENV === "development"),
  sequelize: awilix.asFunction(require("./db/connection").default, {
    lifetime: Lifetime.SINGLETON,
  }),
});
//Models
container.register({
  User: awilix.asFunction(require("./models/user").default),
  Board: awilix.asFunction(require("./models/board").default),
  BoardColumn: awilix.asFunction(require("./models/boardColumn").default)
})
//Services
container.register({
  usersService: awilix.asClass(require("./services/users").default),
  boardsService: awilix.asClass(require("./services/boards").default),
  boardColumnsService: awilix.asClass(require("./services/boardColumns").default),
  tasksService: awilix.asClass(require("./services/tasks").default),
});
//Controllers
container.register({
  usersController: awilix.asClass(require("./controllers/user").default),
  boardsController: awilix.asClass(require("./controllers/boards").default),
  boardColumnsController: awilix.asClass(require("./controllers/boardColumns").default),
  tasksController: awilix.asClass(require("./controllers/tasks").default),
});
