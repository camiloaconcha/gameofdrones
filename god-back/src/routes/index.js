const express = require("express");
const router = express.Router();
const players = require("./../controllers/player.controller");

module.exports = app => {
  router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
  });

  app.post("/players", players.create);
  app.get("/players", players.findAll);
};
