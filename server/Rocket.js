const GameEntity = require("./GameEntity");

module.exports = class Rocket extends GameEntity {
  constructor(shooter_id) {
    super();
    this.shooter_id = shooter_id;
    this.type = "Rocket";
    this.ttl = 3;
    this.radius = 10;
  }

  update(delta, game) {
    super.update(delta, game);
    this.x += this.velocity.x * 1000 * delta;
    this.y += this.velocity.y * 1000 * delta;

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
