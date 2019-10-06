const Player = require("../models/player.model");

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Player content should have a name"
    });
  }

  const player = new Player({
    name: req.body.name || "Untitled player"
  });

  player
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Player."
      });
    });
};

exports.findAll = (req, res) => {
  Player.find()
    .then(players => {
      res.send(players);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};
