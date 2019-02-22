import * as PIXI from "pixi.js";
import UpdatableObject from "../UpdatableObject";

export default class Trail extends UpdatableObject {
  constructor(bullet) {
    super();

    this.bullet = bullet;

    this.x = bullet.x;
    this.y = bullet.y;

    this.trailImage = new PIXI.Sprite.fromImage("/assets/trail.png");
    this.addChild(this.trailImage);
  }

  update(delta) {
    if (this.alpha <= 0) {
      this.parent.removeChild(this);
      return;
    }

    let vec = {
      dx: this.bullet.x - this.x,
      dy: this.bullet.y - this.y
    };
    let ln = Math.sqrt(Math.pow(vec.dx, 2) + Math.pow(vec.dy, 2));

    this.rotation = Math.atan2(vec.dy, vec.dx);
    this.trailImage.width = ln;
    this.alpha -= 1 * delta;
  }
}
