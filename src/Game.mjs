import Mobile from "./Mobile.mjs";
import Room from "./Room.mjs";
import Area from "./Area.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function initializeGame(areaList = []) {
  const areaDirectory = path.join(__dirname, "..", "areas");
  const dir = fs.opendirSync(areaDirectory);
  // const area = new Area();
  // area.rooms.push(new Room());
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    const areaData = JSON.parse(
      fs.readFileSync(path.join(areaDirectory, dirent.name), "utf-8")
    );
    const area = Area.parseArea(areaData);
    Room.parseRooms(area, areaData, areaList);
    areaList.push(area);
  }
  dir.closeSync();
  areaList.forEach((area) => {
    area.rooms.forEach((room) => {
      Room.connectExits(room, areaList);
    });
  });
}

export { initializeGame };
