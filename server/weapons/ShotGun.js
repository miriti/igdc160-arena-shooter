const Weapon = require("./Weapon");
const Bullet = require("./projectiles/Bullet");

module.exports = class ShotGun extends Weapon {
  constructor() {
    super();
    this.name = "Shotgun";
    this.projPerShot = 5;
    this.spreadMin = this.spreadMax = Math.PI / 16;
    this.recoilTime = 1;
  }

  projectileFactory() {
    return new Bullet();
  }
};
