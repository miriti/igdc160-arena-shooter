import * as PIXI from "pixi.js";

import Entity from "./Entity";

export default class Heal extends Entity {
  constructor(data) {
    super(data);

    let border = 6;
    let strikeWidth = 8;

    let image = new PIXI.Graphics();
    image.beginFill(0xfdffffc);
    image.drawCircle(0, 0, this.radius);
    image.endFill();

    image.beginFill(0xf06534);
    image.drawRect(
      -(strikeWidth / 2),
      -(this.radius - border),
      strikeWidth,
      this.radius * 2 - border * 2
    );
    image.drawRect(
      -(this.radius - border),
      -(strikeWidth / 2),
      this.radius * 2 - border * 2,
      strikeWidth
    );
    image.endFill();

    this.addChild(image);
  }
}
