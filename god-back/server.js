"use strict";

const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const router = express.Router();
const port = process.env.PORT || 6200;
const index = require("./src/routes/index");

//Server
const app = express();
const clientPath = `${__dirname}/../`;
console.log(`ORIGIN ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);



const getApiAndEmit = async socket => {
  try {
    socket.emit("message", 'a'); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
}

// Constants
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

server.on("error", err => {
  console.error("ERROR", err);
});

server.listen(port, () => {
  console.log(`Running on http://${HOST}:${port}`);
});
/*
io.on("connection", sock => {
  sock.emit("message", "Hi you are connected");
  sock.on("message", text => {
    io.emit("message", text);
  });
});
*/
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});



