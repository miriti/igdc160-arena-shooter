const GameEntity = require("./GameEntity");

module.exports = class Player extends GameEntity {
  constructor(name) {
    super();

    this.type = "Player";

    this.name = name;

    this.x = -(500 / 2) + Math.random() * 500;
    this.y = -(500 / 2) + Math.random() * 500;

    this.velocity = { x: 0, y: 0 };
  }

  update(delta) {
    this.x += this.velocity.x * 100.0 * delta;
    this.y += this.velocity.y * 100.0 * delta;
  }
};