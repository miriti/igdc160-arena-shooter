const GameEntity = require("./GameEntity");

module.exports = class Rocket extends GameEntity {
  constructor() {
    super();
    this.type = "Rocket";
    this.ttl = 5;
  }

  update(delta) {
    super.update(delta);
    this.x += this.velocity.x * 200 * delta;
    this.y += this.velocity.y * 200 * delta;
  }
};
