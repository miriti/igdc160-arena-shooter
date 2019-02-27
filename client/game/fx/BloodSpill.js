import * as PIXI from "pixi.js";
import UpdatableObject from "../UpdatableObject";

class BloodDrop extends UpdatableObject {
  constructor() {
    super();

    let image = new PIXI.Graphics();
    image.beginFill(0xf06543);
    image.drawCircle(0, 0, 2 + Math.random() * 5);
    image.endFill();

    this.vector = new PIXI.Point(
      -1 + Math.random() * 2,
      -Math.abs(Math.random()) * 6
    );

    let l = Math.sqrt(Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2));

    this.vector.x /= l;
    this.vector.y /= l;

    this.floor = -10 + Math.random() * 20;

    this.speed = 500 + Math.random() * 200;

    this.ttl = 3;

    this.addChild(image);
  }

  update(delta) {
    super.update(delta);

    if (this.ttl > 0) {
      this.x += this.vector.x * this.speed * delta;
      this.y += this.vector.y * this.speed * delta;

      this.vector.x *= 0.92;

      if (this.y >= this.floor) {
        this.y = this.floor;
        this.vector.y = -this.vector.y * 0.8;
        if (this.vector.y < -0.1) {
          this.vector.y = 0;
        }
      } else {
        this.vector.y += 2 * delta;
      }

      this.ttl -= delta;

      if (this.ttl < 2) {
        this.alpha = Math.max(0, this.ttl / 2);
      }
    } else {
      this.parent.removeChild(this);
    }
  }
}

export default class BloodSpill extends UpdatableObject {
  constructor() {
    super();

    this.drops = [];

    for (let i = 0; i < 40 + Math.floor(Math.random() * 30); i++) {
      let newDrop = new BloodDrop();
      newDrop.x = -20 + Math.random() * 40;
      newDrop.y = -20 + Math.random() * 40;
      this.drops.push(newDrop);
      this.addChild(newDrop);
    }
  }

  update(delta) {
    super.update(delta);

    if (this.drops.filter(d => d.ttl > 0).length == 0) {
      this.parent.removeChild(this);
    }
  }
}
