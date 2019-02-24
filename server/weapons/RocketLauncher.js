const Weapon = require("./Weapon");
const Rocket = require("./projectiles/Rocket");

module.exports = class RocketLauncher extends Weapon {
  constructor() {
    super();
    this.name = "Rocket Launcher";
    this.recoilTime = 1.5;
  }

  projectileFactory() {
    return new Rocket(this.target);
  }
};
