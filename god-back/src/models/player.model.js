const mongoose = require("mongoose");

const player = mongoose.Schema(
  {},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Player", player);
