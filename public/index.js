const socket = io();
const chatBox = document.querySelector("#chat-box");
const messages = document.querySelector(".messages");
const player = {
  name: "user" + Math.floor(Math.random() * 10000000000000000),
};

const loginState = { state: "initial" };

socket.emit("login message", { loginState: loginState.state });

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const argStart = chatBox.value.indexOf(" ") + 1;
    const command = chatBox.value.substring(0, argStart).trim();
    const args = chatBox.value.substring(argStart);
    console.log(
      `Command: ${command}\nArgs: ${chatBox.value.substring(argStart)}`
    );

    switch (loginState.state) {
      case "name entered":
        socket.emit("login message", {
          loginState: loginState.state,
          msg: chatBox.value,
        });
        break;

      case "connected":
        socket.emit("send command", {
          playerName: player.name,
          command: command,
          args: args,
        });
        break;
    }

    chatBox.value = "";
  }
});

socket.on("chat message", (msgData) => {
  const sender = getSenderName(msgData);
  let speechVersion = msgData.playerName === player.name ? "say" : "says";
  const textContent = `${sender} ${speechVersion}, '${msgData.msg}'`;
  const message = createNewMessage(textContent, "spoken-msg");
  messages.appendChild(message);
  pruneOldMessages();
});

socket.on("unknown command", (msg) => {
  const message = createNewMessage(msg, "unknown-command");
  messages.appendChild(message);
  pruneOldMessages();
});

socket.on("change name", (msg) => {
  player.name = msg;
  document.title = msg;
});

socket.on("shout", (msgData) => {
  const senderName = getSenderName(msgData);
  let shoutVersion = msgData.playerName === player.name ? "shout" : "shouts";
  const textContent = `${senderName} ${shoutVersion}, '${msgData.args}'`;
  const message = createNewMessage(textContent, "msg-red");
  messages.appendChild(message);
  pruneOldMessages();
});

socket.on("login message", (msgData) => {
  if (msgData.loginState === "initial") {
    loginState.state = "name entered";
    const message = createNewMessage(msgData.msg);
    console.log(message);
    messages.appendChild(message);
  } else if (msgData.loginState === "name entered") {
    // Display welcome back message
    loginState.state = "connected";
    document.title = msgData.name;
    player.name = msgData.name;
    const message = createNewMessage(
      `Welcome back, ${player.name}!`,
      "spoken-msg"
    );
    messages.appendChild(message);
  }
});

function createNewMessage(msgContent, msgClass = null, senderName = "") {
  const message = document.createElement("li");
  if (msgClass) message.classList.add(msgClass);
  message.textContent = msgContent;
  return message;
}

function pruneOldMessages() {
  if (messages.childElementCount > 100) {
    messages.removeChild(messages.firstChild);
  }
}

function getSenderName(msgData) {
  if (msgData.playerName == player.name) {
    return "You";
  } else {
    return msgData.playerName;
  }
}
