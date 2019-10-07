const mongoose = require("mongoose");

const player = mongoose.Schema(
  { name: String },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Player", player);
