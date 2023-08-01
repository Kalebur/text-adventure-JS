class Room {
  areaID;
  id;
  name;
  description;
  exits;
  mobsInRoom;

  constructor() {
    this.name = "A Boring, Empty Room";
    this.description =
      "The room has four plain walls, a wooden floor, and a single lamp hanging from the ceiling.";
    this.exits = [];
    this.mobsInRoom = [];
  }

  displayRoom() {}

  static parseRooms(area, areaData, areaList) {
    areaData.rooms.forEach((room) => {
      const newRoom = new Room();
      area.rooms[room.id].areaID = areaData.id;
      area.rooms[room.id].id = room.id;
      area.rooms[room.id].name = room.name;
      area.rooms[room.id].description = room.description;
      area.rooms[room.id].exits = room.exits;
    });
  }

  static connectExits(room, areaList) {
    room.exits.forEach((exit) => {
      try {
        exit.connectedRoom =
          areaList[exit.connectedAreaID].rooms[exit.connectedRoomID];
      } catch {
        console.log("Danger Will Robinson! DANGER! DANGER!");
      }
    });
  }

  static getExitNames(room, areaList) {
    const exitNames = [];
    room.exits.forEach((exit) => {
      try {
        const direction = exit.direction;
        const exitName =
          areaList[exit.connectedAreaID].rooms[exit.connectedRoomID].name;
        exitNames.push({ direction, exitName });
      } catch {
        console.log("Area/Exit not found.");
      }
    });

    return exitNames;
  }

  static cloneRoom(room) {
    const newRoom = new Room();
    newRoom.areaID = room.areaID;
    newRoom.name = room.name;
    newRoom.description = room.description;

    return newRoom;
  }
}

export default Room;
