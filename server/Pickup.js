const GameEntity = require("./GameEntity");
const RocketLauncher = require("./weapons/RocketLauncher");
const MachineGun = require("./weapons/MachineGun");
const ShotGun = require("./weapons/ShotGun");

module.exports = class Pickup extends GameEntity {
  constructor() {
    super();

    let weaponClasses = [RocketLauncher, MachineGun, ShotGun];
    weaponClasses.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
    let WeaponClass = weaponClasses[0];

    this.type = "Pickup";
    this.carries = new WeaponClass();
    this.radius = 20;
    this.shootable = false;
  }
};
