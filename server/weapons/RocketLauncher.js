const Weapon = require("./Weapon");
const Rocket = require("./projectiles/Rocket");
const Bullet = require("./projectiles/Bullet");

module.exports = class RocketLauncher extends Weapon {
  constructor() {
    super();
    this.name = "Rocket Launcher";
    this.recoilTime = 1.5;
  }

  projectileFactory() {
    return new Rocket();
  }
};
