import app from "./app";
import container from "./config";

(async()=>{
  const PORT = container.cradle.serverPort;
  const db = container.cradle.sequelize;
  await db.sync();
  console.log("Connection has been established successfully.");
  app.listen(PORT,async()=>{
    console.log(`Server listening in PORT ${PORT}`);
  });
})();

