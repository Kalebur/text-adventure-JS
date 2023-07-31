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
  // res.send("File at: " + __dirname);
  res.sendFile(__dirname + "/index.html");
});

app.get("/room/:ID", (req, res) => {
  console.log(req.params.ID);
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
        connectedPlayers.push(player);
        socket.emit("login message", {
          loginState: "name entered",
          name: player.name,
        });
        break;
    }
  });

  socket.on("chat message", (senderData) => {
    console.log(`Message received: ${senderData}`);
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
