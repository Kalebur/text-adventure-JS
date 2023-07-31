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

  static parseRooms(area, areaData) {
    area.rooms = [];
    areaData.rooms.forEach((room) => {
      const newRoom = new Room();
      newRoom.areaID = area.id;
      newRoom.id = room.id;
      newRoom.description = room.description;
      newRoom.exits = room.exits;
      area.rooms.push(newRoom);
    });
  }
}

export default Room;
