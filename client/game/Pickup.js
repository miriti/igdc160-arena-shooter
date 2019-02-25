import * as PIXI from "pixi.js";
import Entity from "./Entity";

export default class Pickup extends Entity {
  constructor(data) {
    super(data);

    let image = new PIXI.Graphics();
    image.beginFill(0xfdffffc);
    image.drawCircle(0, 0, this.radius);
    image.endFill();
    this.addChild(image);

    this.title = new PIXI.Text(data["carries"]["name"], {
      fontFamily: "Arial",
      fill: 0x246eb9,
      fontSize: 14,
      align: "center"
    });
    this.title.y = -this.radius - 20;
    this.title.x = -this.title.width / 2;

    this.addChild(this.title);
  }

  set data(newData) {
    super.data = newData;
  }
}
