const Weapon = require("./Weapon");
const Bullet = require("./projectiles/Bullet");

module.exports = class MachineGun extends Weapon {
  constructor() {
    super();

    this.name = "Machine Gun";
    this.recoilTime = 0.1;
    this.spreadMin = Math.PI / 32;
    this.spreadMax = Math.PI / 16;
    this.spreadTime = 1.5;
  }

  projectileFactory() {
    return new Bullet();
  }
};
