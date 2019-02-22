const GameEntity = require("./GameEntity");
const RocketLauncher = require("./weapons/RocketLauncher");
const MachineGun = require("./weapons/MachineGun");
module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";
    this.name = name;
    this.radius = 20;
    this.maxHealth = 100;
    this.health = 100;
    // this.weapon = new RocketLauncher();
    this.weapon = new MachineGun();

    this.respawn();
  }

  respawn() {
    this.health = this.maxHealth;

    this.velocity.x = 0;
    this.velocity.y = 0;

    this.x = -(500 / 2) + Math.random() * 500;
    this.y = -(500 / 2) + Math.random() * 500;

    this.weapon.reset();
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

      let collisions = this.getCollisions(game);

      for (let entity of collisions) {
        if (this.health < this.maxHealth && entity["type"] == "Heal") {
          this.health = this.maxHealth;
          entity.remove();
        }
      }
    }
  }

  hit(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.health = 0;
    }
  }
};
