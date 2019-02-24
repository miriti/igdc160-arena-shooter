let nextId = 1;

module.exports = class GameEntity {
  constructor() {
    this.ID = nextId++;
    this.type = "Entity";
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.direction = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.pointing = { x: -1, y: 0 };
    this.speed = 0;
    this.ttl = null;
    this.shootable = true;
    this.collision = true;
    this.maxDistance = null;
    this.totalTravel = 0;
  }

  getVelocity() {
    return {
      x: this.direction.x * this.speed,
      y: this.direction.y * this.speed
    };
  }

  getCollisions(game) {
    let collisions = [];
    for (let entity of game.entities.filter(e => e != this && e.collision)) {
      let dist = Math.sqrt(
        Math.pow(entity.x - this.x, 2) + Math.pow(entity.y - this.y, 2)
      );

      if (dist < this.radius + entity.radius) {
        collisions.push(entity);
      }
    }
    return collisions;
  }

  onArenaCollision() {}

  onMaxDistance(game) {
    this.remove();
  }

  move(delta, game, onCollision) {
    let velocity = this.getVelocity();

    if (velocity.x != 0 || velocity.y != 0) {
      let originalPos = {
        x: this.x,
        y: this.y
      };

      let targetPos = {
        x: this.x + velocity.x * delta,
        y: this.y + velocity.y * delta
      };

      let leapTravel = Math.sqrt(
        Math.pow(targetPos.x - this.x, 2) + Math.pow(targetPos.y - this.y, 2)
      );

      let vector = {
        x: (targetPos.x - originalPos.x) / leapTravel,
        y: (targetPos.y - originalPos.y) / leapTravel
      };

      if (leapTravel != 0 && leapTravel > this.radius) {
        let interTravel = 0;

        do {
          this.x = originalPos.x + vector.x * interTravel;
          this.y = originalPos.y + vector.y * interTravel;

          if (onCollision) {
            let collisions = this.getCollisions(game);

            if (collisions.length > 0) {
              if (onCollision(collisions)) {
                break;
              }
            }
          }

          interTravel = Math.min(interTravel + this.radius, leapTravel);
        } while (interTravel < leapTravel);
      } else {
        this.x = targetPos.x;
        this.y = targetPos.y;

        if (onCollision) {
          let collisions = this.getCollisions(game);

          if (collisions.length > 0) {
            if (onCollision(collisions)) {
            }
          }
        }
      }

      let lg = Math.sqrt(Math.pow(targetPos.x, 2) + Math.pow(targetPos.y, 2));

      if (lg >= game.arena.radius - this.radius) {
        this.x = (targetPos.x / lg) * (game.arena.radius - this.radius);
        this.y = (targetPos.y / lg) * (game.arena.radius - this.radius);
        this.onArenaCollision();
      }

      if (this.maxDistance != null && this.origin) {
        let total = Math.sqrt(
          Math.pow(this.x - this.origin.x, 2) +
            Math.pow(this.y - this.origin.y, 2)
        );

        if (total >= this.maxDistance) {
          this.onMaxDistance(game);
        }
      }
    }
  }

  update(delta, game) {
    if (this.ttl != null && this.ttl <= 0) {
      return;
    }

    if (this.ttl != null) {
      this.ttl -= delta;
    }

    for (let child of this.children) {
      child.update(delta);
    }
  }

  remove() {
    this.ttl = 0;
  }
};
