import Entity from "./Entity";
import * as PIXI from "pixi.js";

export default class Rocket extends Entity {
  constructor(data) {
    super(data);

    let rocket = new PIXI.Graphics();
    rocket.beginFill(0xfdfffc);
    rocket.drawRoundedRect(-10, -4, 20, 8, 4);
    rocket.endFill();

    this.addChild(rocket);

    this.rotation = Math.atan2(this.velocity.y, this.velocity.x);
  }
}
