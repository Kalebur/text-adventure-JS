import Mobile from "./Mobile.mjs";
import Room from "./Room.mjs";
import Area from "./Area.mjs";
import fs from "fs";
import path from "path";

function initializeGame(areaList = []) {
  const dirname =
    "D:\\Creative Stuff\\Programming Projects\\TextAdventure\\areas\\";
  const dir = fs.opendirSync(dirname);
  // const area = new Area();
  // area.rooms.push(new Room());
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    const areaData = JSON.parse(
      fs.readFileSync(path.join(dirname, dirent.name), "utf-8")
    );
    const area = new Area();
    Room.parseRooms(area, areaData);
    areaList.push(area);
  }
  dir.closeSync();
}

export { initializeGame };
