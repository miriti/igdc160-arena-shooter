const GameEntity = require("./GameEntity");
const RocketLauncher = require("./weapons/RocketLauncher");
const MachineGun = require("./weapons/MachineGun");
const ShotGun = require("./weapons/ShotGun");
const Pistol = require("./weapons/Pistol");

module.exports = class Pickup extends GameEntity {
  constructor(typeClass) {
    super();

    let weaponClasses = [RocketLauncher, MachineGun, ShotGun, Pistol];
    weaponClasses.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
    let WeaponClass = typeClass == null ? weaponClasses[0] : typeClass;

    this.type = "Pickup";
    this.carries = new WeaponClass();
    this.radius = 20;
    this.shootable = false;
  }
};
