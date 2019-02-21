const Projectile = require("./Projectile");

module.exports = class Bullet extends Projectile {
  constructor() {
    super();

    this.type = "Bullet";
  }
};
