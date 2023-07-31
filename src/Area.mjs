import Room from "./Room.mjs";

class Area {
  id = 0;
  filename = "";
  name = "";
  description = "";
  objectCount;
  mobCount;
  roomCount;
  rooms;
  objects;
  mobs;

  constructor() {
    this.name = "A brand NEW area!";
    this.description =
      "This area is brand new! It even has that 'new area' smell!";
    this.objectCount = 0;
    this.mobCount = 0;
    this.roomCount = 1;
    this.rooms = [];
    this.objects = [];
    this.mobs = [];
  }

  static parseArea(areaData) {
    const area = new Area();
    area.id = areaData.id;
    area.filename = areaData.filename;
    area.name = areaData.name;
    area.description = areaData.description;
    area.objectCount = areaData.objectCount;
    area.mobCount = areaData.actorCount;
    area.roomCount = areaData.roomCount;
  }
}

export default Area;
