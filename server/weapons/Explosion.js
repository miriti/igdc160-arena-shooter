const GameEntity = require("../GameEntity");

module.exports = class Explosion extends GameEntity {
  constructor() {
    super();

    this.type = "Explosion";
    this.radius = 0;
    this.hitPower = 75;
    this.shooter_id = null;

    this._explosionRadius = 150;
    this._explosionTime = 0;
    this._totalExplosionTime = 0.5;
    this._hit = [];
  }

  update(delta, game) {
    super.update(delta, game);

    if (this._explosionTime >= this._totalExplosionTime) {
      this.remove();
    } else {
      let t = this._explosionTime / this._totalExplosionTime;
      this.radius = this._explosionRadius * (t * t);

      this._explosionTime += delta;

      let collisions = this.getCollisions(game).filter(
        e => this._hit.indexOf(e) == -1
      );

      for (let entity of collisions) {
        if (entity.type == "Player" && entity.alive) {
          entity.hit(this.hitPower);
          if (!entity.alive) {
            let shooter = game.getEntityByID(this.shooter_id);
            if (shooter != null) {
              shooter.frags++;
            }
            game.updateTop();
          }
          this._hit.push(entity);
        }
      }
    }
  }
};
