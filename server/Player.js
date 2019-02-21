const GameEntity = require("./GameEntity");
const RocketLauncher = require("./weapons/RocketLauncher");

module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";
    this.name = name;
    this.radius = 20;
    this.maxHealth = 100;
    this.health = 100;
    this.weapon = new RocketLauncher();

    this.respawn();
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
      this.weapon.update(delta);

      let nextPos = {
        x: this.x + this.velocity.x * 400.0 * delta,
        y: this.y + this.velocity.y * 400.0 * delta
      };

      let lg = Math.sqrt(Math.pow(nextPos.x, 2) + Math.pow(nextPos.y, 2));

      if (lg >= game.arena.radius - this.radius) {
        nextPos.x = (nextPos.x / lg) * (game.arena.radius - this.radius);
        nextPos.y = (nextPos.y / lg) * (game.arena.radius - this.radius);
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
