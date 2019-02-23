const GameEntity = require("../../GameEntity");

module.exports = class Projectile extends GameEntity {
  constructor() {
    super();

    this.hitPower = 1;
    this.shootable = false;
  }

  update(delta, game) {
    super.update(delta, game);
    this.move(delta, game);

    for (let entity of this.getCollisions(game).filter(
      e => e.shootable && e.ID != this.shooter_id
    )) {
      if (entity.type == "Player" && entity.alive) {
        entity.hit(this.hitPower);
        if (!entity.alive) {
          let shooter = game.getEntityByID(this.shooter_id);
          if (shooter != null) {
            shooter.frags++;
          }
          game.updateTop();
        }
      }

      this.remove();
      break;
    }
  }
};
