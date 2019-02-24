const Projectile = require("./Projectile");
const Explosion = require("../Explosion");

module.exports = class Rocket extends Projectile {
  constructor(target) {
    super();
    this.type = "Rocket";
    this.ttl = 3;
    this.radius = 5;
    this.hitPower = 75;
    this.shootable = true;
    this.speed = 0;
    this.target = Object.assign({}, target);

    this._time = 0;
    this._originalDirection = true;
  }

  onMaxDistance(game) {
    this.remove();
    let explosion = new Explosion();
    explosion.x = this.x;
    explosion.y = this.y;
    game.addEntity(explosion);
  }

  update(delta, game) {
    if (this._originalDirection) {
      this.maxDistance = Math.sqrt(
        Math.pow(this.target.x - this.origin.x, 2) +
          Math.pow(this.target.y - this.origin.y, 2)
      );
      this._originalDirection = false;
    }
    super.update(delta, game);

    let t = Math.min(this._time, 0.8) / 0.8;

    this.speed = 1000 * (t * t);
    this._time += delta;
  }
};
