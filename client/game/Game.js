import * as PIXI from "pixi.js";

export default class Game extends PIXI.Sprite {
  constructor() {
    super();

    let circle = new PIXI.Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 100);
    circle.endFill();
    this.addChild(circle);
  }
}
