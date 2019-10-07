"use strict";
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const port = process.env.PORT || 6200;
const bodyParser = require("body-parser");

const HOST = "0.0.0.0";
const morgan = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");
//Server
const clientPath = `${__dirname}/../`;
const players = require("./src/controllers/player.controller");
const dbConfig = require("./src/config/database.config.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(compression());
app.use(morgan("tiny"));


mongoose.Promise = global.Promise;
mongoose
  .createConnection(dbConfig.url, {
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

io.on("connection", socket => {
  console.log("New client connected"),
    setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on("add-player", function(name) {
  players.create(name);
  io.sockets.emit("players", name);
});
require("./src/routes/index")(app);

server.listen(port, () => {
  console.log(`Running on http://${HOST}:${port}`);
});
