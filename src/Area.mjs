import Room from "./Room.mjs";
import Object from "./Object.mjs";
import Mobile from "./Mobile.mjs";

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

    // Pre-generate blank objects
    for (let i = 0; i < area.objectCount; i++) {
      const obj = new Object(area);
      area.objects.push(obj);
    }

    // Pre-generate default mobs
    for (let i = 0; i < area.mobCount; i++) {
      const mob = new Mobile();
      area.mobs.push(mob);
    }

    // Pre-generate empty rooms
    for (let i = 0; i < area.roomCount; i++) {
      const room = new Room();
      area.rooms.push(room);
    }

    return area;
  }
}

export default Area;
