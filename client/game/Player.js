import Entity from "./Entity";
import * as PIXI from "pixi.js";

export default class Player extends Entity {
  constructor(data) {
    super(data);

    let circle = new PIXI.Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    this.addChild(circle);

    this.gun = new PIXI.Graphics();
    this.gun.beginFill(0xff0000);
    this.gun.drawRect(0, -5, 20, 10);
    this.gun.endFill();
    this.addChild(this.gun);

    this.fire = false;
  }

  set data(newData) {
    super.data = newData;
    this.fire = newData["fire"];
  }

  update(delta) {
    this.gun.rotation = Math.atan2(this.pointing.y, this.pointing.x);
  }
}
