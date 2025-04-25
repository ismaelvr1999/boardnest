import app from "./app";

(async()=>{
  const PORT = 3000;
  
  app.listen(PORT,async()=>{
    console.log(`Server listening in PORT ${PORT}`);
  })
})();

