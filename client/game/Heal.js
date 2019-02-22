import * as PIXI from "pixi.js";

import Entity from "./Entity";

export default class Heal extends Entity {
  constructor(data) {
    super(data);

    let border = 4;

    let image = new PIXI.Graphics();
    image.beginFill(0xfdffffc);
    image.drawCircle(0, 0, this.radius);
    image.endFill();

    image.beginFill(0xf06534);
    image.drawRect(
      -5,
      -(this.radius - border),
      10,
      this.radius * 2 - border * 2
    );
    image.drawRect(
      -(this.radius - border),
      -5,
      this.radius * 2 - border * 2,
      10
    );
    image.endFill();

    this.addChild(image);
  }
}
