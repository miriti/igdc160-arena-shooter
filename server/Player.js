const GameEntity = require("./GameEntity");
const Pistol = require("./weapons/Pistol");
const Pickup = require("./Pickup");

module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";
    this.name = name;
    this.radius = 20;
    this.maxHealth = 100;
    this.health = 100;
    this.weapon = new Pistol();
    this.frags = 0;
    this.deaths = 0;
    this.speed = 400;

    this._dead = false;
    this._oldDirection = { x: 0, y: 0 };
    this._accelerationTime = 0.5;
    this._movingTime = 0;

    this.respawn();
  }

  respawn() {
    this._dead = false;
    this.health = this.maxHealth;

    this.velocity.x = 0;
    this.velocity.y = 0;

    this.direction.x = 0;
    this.direction.y = 0;

    this.x = -(500 / 2) + Math.random() * 500;
    this.y = -(500 / 2) + Math.random() * 500;

    this.weapon.reset();
  }

  get alive() {
    return this.health > 0;
  }

  update(delta, game) {
    super.update(delta, game);

    if (this.health <= 0 && !this._dead) {
      this._dead = true;

      game.io.emit("died", this);

      if (game.entities.filter(e => e.type == "Pickup").length <= 5) {
        let weaponPickup = new Pickup(this.weapon.constructor);
        weaponPickup.x = this.x;
        weaponPickup.y = this.y + this.radius;
        game.addEntity(weaponPickup);
      }
    }

    if (this.alive) {
      this.weapon.update(delta);

      if (this.weapon.fire) {
        let projectiles = this.weapon.projectiles();

        if (projectiles != null) {
          projectiles.forEach(projectile => {
            let spread = this.weapon.spread;
            let angle =
              Math.atan2(this.pointing.y, this.pointing.x) +
              -spread / 2 +
              Math.random() * spread;

            let vector = {
              x: Math.cos(angle),
              y: Math.sin(angle)
            };
            projectile.shooter_id = this.ID;
            projectile.pointing = vector;
            projectile.x = projectile.origin.x =
              this.x + vector.x * (this.radius + projectile.radius);
            projectile.y = projectile.origin.y =
              this.y + vector.y * (this.radius + projectile.radius);

            projectile.direction.x = vector.x;
            projectile.direction.y = vector.y;
            game.addEntity(projectile);
          });
        }
      }

      this.move(delta, game);

      let collisions = this.getCollisions(game);

      for (let entity of collisions) {
        if (entity.type == "Pickup") {
          let fireState = this.weapon.fire;
          this.weapon = entity.carries;
          this.weapon.fire = fireState;
          entity.remove();
        } else if (this.health < this.maxHealth && entity["type"] == "Heal") {
          this.health = this.maxHealth;
          entity.remove();
        }
      }
    }
  }

  hit(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.deaths++;
      this.health = 0;
    }
  }
};
