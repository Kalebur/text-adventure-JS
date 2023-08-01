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
      const targetRoom = area.rooms[room.id];
      targetRoom.areaID = areaData.id;
      targetRoom.id = room.id;
      targetRoom.description = room.description;
      targetRoom.exits = room.exits;

      area[room.id] = newRoom;
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
}

export default Room;
