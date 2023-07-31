import express from "express";
import Area from "./src/Area.mjs";
import http from "http";
import pkg from "lodash";
import Player from "./src/Player.mjs";

import { handleCommand } from "./comms.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
import { initializeGame } from "./src/Game.mjs";

const { cloneDeep: deepClone } = pkg;
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const areas = [];
const connectedPlayers = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/room/:ID", (req, res) => {
  const area = new Area();
  res.send(
    "<div><h1>We made a new area just for you!</h1> <h2>It's called: " +
      area.name +
      "</h2></div>"
  );
});

io.on("connection", (socket) => {
  console.log("A user has connected.");

  socket.on("login message", (senderInfo) => {
    switch (senderInfo.loginState) {
      case "initial":
        socket.emit("login message", {
          msg: "Welcome! What is your name?",
          loginState: "initial",
        });
        break;

      case "name entered":
        const player = new Player();
        player.socket = socket;
        player.name = senderInfo.msg;
        player.currentRoom = areas[0].rooms[0];
        connectedPlayers.push(player);
        socket.emit("login message", {
          loginState: "name entered",
          name: player.name,
          currentRoom: player.currentRoom,
        });
        break;
    }
  });

  socket.on("chat message", (senderData) => {
    io.emit("chat message", senderData);
  });

  socket.on("send command", (playerData) => {
    handleCommand({ socket: socket, io: io, playerData: playerData });
  });
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
  initializeGame(areas);
});
