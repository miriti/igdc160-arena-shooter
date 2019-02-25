const Weapon = require("./Weapon");
const Bullet = require("./projectiles/Bullet");

module.exports = class Pistol extends Weapon {
  constructor() {
    super();

    this.name = "Pistol";
    this.recoilTime = 0.5;
    this.spreadMin = Math.PI / 64;
    this.spreadMax = Math.PI / 92;
    this.spreadTime = 1;
  }

  projectileFactory() {
    return new Bullet();
  }
};
