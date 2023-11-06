let RockController = require("../controllers/RockController");

module.exports = app => {
  app.get("/api/rocks/:id", RockController.read);
  app.get("/api/rocks/all", RockController.all);
  app.post("/api/rocks/create", RockController.create);
  app.put("/api/rocks/:id", RockController.update);
  app.delete("/api/rocks/:id", RockController.delete);
};