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
  }

  getVelocity() {
    return {
      x: this.direction.x * this.speed,
      y: this.direction.y * this.speed
    };
  }

  getCollisions(game, resolve) {
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

  move(delta, game) {
    let nextPos = {
      x: this.x + this.getVelocity().x * delta,
      y: this.y + this.getVelocity().y * delta
    };

    let lg = Math.sqrt(Math.pow(nextPos.x, 2) + Math.pow(nextPos.y, 2));

    if (lg >= game.arena.radius - this.radius) {
      nextPos.x = (nextPos.x / lg) * (game.arena.radius - this.radius);
      nextPos.y = (nextPos.y / lg) * (game.arena.radius - this.radius);
      this.ttl = 0;
    }

    this.x = nextPos.x;
    this.y = nextPos.y;
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
