const Projectile = require("./Projectile");

module.exports = class Bullet extends Projectile {
  constructor() {
    super();

    this.type = "Bullet";
    this.radius = 2;
    this.speed = 2000;
    this.hitPower = 5;
  }
};
