const GameEntity = require("./GameEntity");

module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";

    this.name = name;

    this.x = -(500 / 2) + Math.random() * 500;
    this.y = -(500 / 2) + Math.random() * 500;

    this.radius = 20;

    this.maxHealth = 100;
    this.health = 100;

    this.fire = false;
  }

  update(delta, game) {
    super.update(delta, game);
    this.x += this.velocity.x * 200.0 * delta;
    this.y += this.velocity.y * 200.0 * delta;
  }

  hit(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.health = 0;
      this.ttl = 0;
    }
  }
};
