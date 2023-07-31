export function displayRoom(room) {
  const roomItem = document.createElement("li");
  const roomInfo = document.createElement("div");
  roomInfo.classList.add("message");
  roomInfo.innerHTML = `-= ${room.name} =-<br>${room.description}<br><br>`;
  roomInfo.appendChild(getExitList(room));
  roomItem.appendChild(roomInfo);
  return roomItem;
}

function getExitList(room) {
  const exitList = document.createElement("ul");
  const exitTitle = document.createElement("h4");
  exitTitle.textContent = "Exits:";
  exitList.appendChild(exitTitle);
  room.exits.forEach((exit) => {
    if (exit.connectedRoom) {
      const exitItem = document.createElement("li");
      exitItem.textContent = `${exit.direction} - ${exit.connectedRoom.name}`;
    } else {
      return;
    }
    exitList.appendChild(exitItem);
  });

  return exitList;
}
