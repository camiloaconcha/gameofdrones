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
const dbConfig = require("./src/config/database.config.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const gameLogic = require("./src/controllers/GameLogic");

let gameLoading = null;

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

server.on("error", err => {
  console.error("ERROR", err);
});

io.on("connection", sock => {
  if (gameLoading) {
    new gameLogic(gameLoading, sock);
    gameLoading = null;
  } else {
    gameLoading = sock;
    gameLoading.emit("message", "Waiting");
  }

  sock.on("message", text => {
    io.emit("message", text);
  });
});

require("./src/routes/index")(app);

server.listen(port, () => {
  console.log(`Running on http://${HOST}:${port}`);
});
