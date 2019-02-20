let nextId = 1;

module.exports = class GameEntity {
  constructor() {
    this.ID = nextId++;
    this.type = "Entity";
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.velocity = { x: 0, y: 0 };
    this.pointing = { x: -1, y: 0 };
    this.ttl = null;
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
};
