import * as PIXI from "pixi.js";

export default class Entity extends PIXI.Container {
  constructor(data) {
    super();

    let circle = new PIXI.Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    this.addChild(circle);

    this.data = data;
  }

  update(delta) {}

  set data(newData) {
    this.x = newData.x;
    this.y = newData.y;
  }
}
