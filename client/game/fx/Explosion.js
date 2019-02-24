import * as PIXI from "pixi.js";
import Entity from "../Entity";

export default class Explosion extends Entity {
  constructor(data) {
    super(data);

    this.image = new PIXI.Graphics();
    this.addChild(this.image);
  }

  set data(newData) {
    super.data = newData;

    if (newData["radius"] > 0) {
      this.image.clear();
      this.image.beginFill(0xf5ee9e);
      this.image.drawCircle(0, 0, newData["radius"]);
      this.image.endFill();
    }
  }
}
