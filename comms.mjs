function handleCommand(senderInfo) {
  const command = senderInfo.playerData.command;
  const args = senderInfo.playerData.args;
  const socket = senderInfo.socket;
  const io = senderInfo.io;
  const playerName = senderInfo.playerData.playerName;

  switch (command) {
    case "say":
      DoSay(io, playerName, args);
      break;

    case "changename":
      DoChangePlayerName(socket, args);
      break;

    case "shout":
      DoShout(io, playerName, args);
      break;

    case "emote":
      DoEmote(io, playerName, args);
      break;

    default:
      socket.emit("unknown command", "WHAT?!");
      break;
  }
}

function DoSay(io, playerName, args) {
  io.emit("chat message", { playerName: playerName, msg: args });
}

function DoChangePlayerName(socket, args) {
  socket.emit("change name", args);
}

function DoShout(io, playerName, args) {
  io.emit("shout", { playerName: playerName, args: args });
}

function DoEmote(io, playerName, args) {
  io.emit("emote", { playerName: playerName, args: args });
}

export { handleCommand };
