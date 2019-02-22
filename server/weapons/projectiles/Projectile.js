const GameEntity = require("../../GameEntity");

module.exports = class Projectile extends GameEntity {
  constructor() {
    super();

    this.hitPower = 1;
  }

  update(delta, game) {
    super.update(delta, game);
    this.move(delta, game);

    for (let entity of this.getCollisions(game).filter(e => e.shootable)) {
      entity.hit(this.hitPower);
      this.remove();
      break;
    }
  }
};
