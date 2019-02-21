const Projectile = require("./Projectile");

module.exports = class Rocket extends Projectile {
  constructor() {
    super();
    this.type = "Rocket";
    this.ttl = 3;
    this.radius = 10;
  }

  update(delta, game) {
    super.update(delta, game);

    let nextPos = {
      x: this.x + this.velocity.x * 1000.0 * delta,
      y: this.y + this.velocity.y * 1000.0 * delta
    };

    let lg = Math.sqrt(Math.pow(nextPos.x, 2) + Math.pow(nextPos.y, 2));

    if (lg >= game.arena.radius - this.radius) {
      nextPos.x = (nextPos.x / lg) * (game.arena.radius - this.radius);
      nextPos.y = (nextPos.y / lg) * (game.arena.radius - this.radius);
      this.ttl = 0;
    }

    this.x = nextPos.x;
    this.y = nextPos.y;

    for (let entity of game.entities) {
      if (entity != this && entity.ID != this.shooter_id) {
        let dist = Math.sqrt(
          Math.pow(entity.x - this.x, 2) + Math.pow(entity.y - this.y, 2)
        );

        if (dist < this.radius + entity.radius) {
          this.ttl = 0;

          if (entity["hit"]) {
            entity["hit"](25);
          }
        }
      }
    }
  }
};
