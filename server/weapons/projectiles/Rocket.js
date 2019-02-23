const Projectile = require("./Projectile");

module.exports = class Rocket extends Projectile {
  constructor() {
    super();
    this.type = "Rocket";
    this.ttl = 3;
    this.radius = 5;
    this.hitPower = 75;
    this.shootable = true;
    this.speed = 0;

    this._time = 0;
  }

  update(delta, game) {
    super.update(delta, game);

    let t = Math.min(this._time, 0.8) / 0.8;

    this.speed = 1000 * (t * t);
    this._time += delta;
  }
};
