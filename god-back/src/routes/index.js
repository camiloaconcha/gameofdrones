module.exports = app => {
  const players = require("./../controllers/player.controller");
  app.post("/players", players.create);
  app.get("/players", players.findAll);
};
