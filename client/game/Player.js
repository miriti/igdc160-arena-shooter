import Entity from "./Entity";
import * as PIXI from "pixi.js";
import HealthBar from "./ui/HealthBar";

export default class Player extends Entity {
  constructor(data) {
    super(data);

    let circle = new PIXI.Graphics();
    circle.beginFill(0xf5ee9e);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    this.addChild(circle);

    this.gun = new PIXI.Graphics();
    this.gun.beginFill(0x246eb9);
    this.gun.drawRect(0, -5, 20, 10);
    this.gun.endFill();
    this.addChild(this.gun);

    this.healthBar = new HealthBar(data["maxHealth"]);
    this.healthBar.x = -this.healthBar.width / 2;
    this.healthBar.y = -40;
    this.addChild(this.healthBar);

    this.nameLabel = new PIXI.Text(data["name"], {
      fontFamily: "Arial",
      fill: 0xffffff,
      fontSize: 14,
      align: "center"
    });
    this.nameLabel.x = -this.nameLabel.width / 2;
    this.nameLabel.y = -60;
    this.addChild(this.nameLabel);

    this.fire = false;
  }

  set data(newData) {
    super.data = newData;

    this.health = newData["health"];

    if (this.healthBar) {
      this.healthBar.value = newData["health"];
    }

    if (this.health <= 0) {
      this.alpha = 0.3;
    } else {
      this.alpha = 1;
    }
  }

  update(delta) {
    this.gun.rotation = Math.atan2(this.pointing.y, this.pointing.x);
  }
}
