const GameEntity = require("./GameEntity");

module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";

    this.name = name;

    this.radius = 20;

    this.maxHealth = 100;
    this.health = 100;

    this.respawn();

    this.fire = false;
  }

  respawn() {
    this.health = this.maxHealth;

    this.x = -(500 / 2) + Math.random() * 500;
    this.y = -(500 / 2) + Math.random() * 500;
  }

  get alive() {
    return this.health > 0;
  }

  update(delta, game) {
    super.update(delta, game);

    if (this.alive) {
      let nextPos = {
        x: this.x + this.velocity.x * 400.0 * delta,
        y: this.y + this.velocity.y * 400.0 * delta
      };

      let lg = Math.sqrt(Math.pow(nextPos.x, 2) + Math.pow(nextPos.y, 2));

      if (lg >= 500 - this.radius) {
        nextPos.x = (nextPos.x / lg) * (500 - this.radius);
        nextPos.y = (nextPos.y / lg) * (500 - this.radius);
      }

      this.x = nextPos.x;
      this.y = nextPos.y;
    }
  }

  hit(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.health = 0;
    }
  }
};
