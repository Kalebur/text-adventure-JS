export function displayRoom(room) {
  const roomItem = document.createElement("li");
  const roomInfo = document.createElement("div");
  roomInfo.classList.add("message");
  roomInfo.innerHTML = `-= ${room.roomName} =-<br>${room.description}<br><br>`;
  roomInfo.appendChild(getExitList(room));
  roomItem.appendChild(roomInfo);
  return roomItem;
}

function getExitList(room) {
  const exitList = document.createElement("ul");
  const exitTitle = document.createElement("h4");
  exitTitle.textContent = "Exits:";
  exitList.appendChild(exitTitle);
  room.exitInfo.forEach((exit) => {
    const exitItem = document.createElement("li");
    exitItem.classList.add("exit");
    exitItem.textContent = `${exit.direction} - ${exit.exitName}`;
    exitList.appendChild(exitItem);
  });

  return exitList;
}
