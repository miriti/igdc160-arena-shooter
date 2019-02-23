import Entity from "../Entity";
import Trail from "../fx/Trail";

export default class Bullet extends Entity {
  constructor(data) {
    super(data);

    new Audio("/audio/machinegun-shot.ogg").play();

    let image = new PIXI.Graphics();
    image.beginFill(0xfdffffc);
    image.drawCircle(0, 0, this.radius);
    image.endFill();

    this.addChild(image);

    this.trail = new Trail(this);
  }

  update(delta) {
    super.update(delta);
    if (this.trail.parent == null) {
      this.parent.addChild(this.trail);
    }
  }
}
