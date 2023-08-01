class Mobile {
  id;
  name;
  shortDesc;
  longDesc;
  desc;
  level;
  currentHP;
  maxHP;
  currentMP;
  maxMP;
  gold;
  currentExp;
  currentRoom;

  constructor() {
    this.name = "a Mob";
    this.shortDesc = "a brand new Mob";
    this.longDesc = "Some deity abandoned a poor, new Mob here.";
    this.desc =
      "A sad, pitiful Mob. It has no defining features. It's just a...thing...";
    this.level = 1;
    this.maxHP = 50;
    this.currentHP = this.maxHP;
    this.maxMP = 50;
    this.currentMP = this.maxMP;
    this.gold = 25;
    this.currentExp = 100;
    this.currentRoom = null;
  }
}

export default Mobile;
