const GameEntity = require("./GameEntity");

module.exports = class Heal extends GameEntity {
  constructor() {
    super();

    this.type = "Heal";
    this.radius = 20;
    this.shootable = false;
  }
};
