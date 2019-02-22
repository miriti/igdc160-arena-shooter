const Weapon = require("./Weapon");
const Bullet = require("./projectiles/Bullet");

module.exports = class MachineGun extends Weapon {
  constructor() {
    super();

    this.recoilTime = 0.15;
  }

  projectileFactory() {
    return new Bullet();
  }
};
