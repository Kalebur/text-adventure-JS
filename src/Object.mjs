class Object {
  areaID;
  id;
  keywords;
  shortDesc;
  longDesc;
  desc;
  weight;
  wearLocs;
  objectFlags;

  constructor(area) {
    this.areaID = area.id;
    this.id = area.objects.length;
    this.keywords = ["object"];
    this.shortDesc = "an Object";
    this.longDesc = "Some deity abandoned a newly created Object here.";
    this.desc = "It has that 'new Object' smell!";
    this.weight = 1;
    this.wearLocs = [];
    this.objectFlags = {
      canTake: true,
    };
  }
}

export default Object;
