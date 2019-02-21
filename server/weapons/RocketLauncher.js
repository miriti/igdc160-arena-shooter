const Weapon = require("./Weapon");
const Rocket = require("./projectiles/Rocket");

module.exports = class RocketLauncher extends Weapon {
  constructor() {
    super();
    this.name = "Rocket Launcher";
    this.recoilTime = 0.3;
  }

  projectileFactory() {
    return new Rocket();
  }
};
