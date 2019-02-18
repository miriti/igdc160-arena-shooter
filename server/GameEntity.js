let nextId = 1;

module.exports = class GameEntity {
  constructor() {
    this.ID = nextId++;
    this.type = "Entity";
    this.children = [];
    this.x = 0;
    this.y = 0;
  }

  update(delta) {
    for (let child of this.children) {
      child.update(delta);
    }
  }
};
