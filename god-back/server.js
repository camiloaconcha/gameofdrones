"use strict";
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const port = process.env.PORT || 6200;
const bodyParser = require("body-parser");
const players = require("./src/controllers/player.controller");
const dbConfig = require("./src/config/database.config.js");
const HOST = "0.0.0.0";
const morgan = require('morgan');
const compression = require('compression');
const mongoose =  require('mongoose');

//Server
const app = express();
const clientPath = `${__dirname}/../`;

mongoose.Promise = global.Promise;
mongoose
  .createConnectionc(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

console.log(`ORIGIN ${clientPath}`);

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("tiny"));

require("./src/routes/index")(app);

const server = http.createServer(app);
const io = socketio(server);



// Constants
const getApiAndEmit = async socket => {
  try {
    socket.emit("message", text); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
app.get("/", (req, res) => {
  res.send("Hello world\n");
});

server.on("error", err => {
  console.error("ERROR", err);
});

server.listen(port, () => {
  console.log(`Running on http://${HOST}:${port}`);
});

io.on("connection", socket => {
  console.log("New client connected"),
    setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on("add-player", function(name) {
  players.create(name);
  io.sockets.emit("players", name);
});
