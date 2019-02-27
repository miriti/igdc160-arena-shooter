import Entity from "./Entity";
import * as PIXI from "pixi.js";
import HealthBar from "./ui/HealthBar";
import BloodSpill from "./fx/BloodSpill";

export default class Player extends Entity {
  constructor(data) {
    super(data);

    this.sprite = new PIXI.Sprite.from("/assets/player.png");
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);

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
      fill: 0x246eb9,
      fontSize: 14,
      align: "center"
    });
    this.nameLabel.x = -this.nameLabel.width / 2;
    this.nameLabel.y = -60;
    this.addChild(this.nameLabel);

    this.fire = false;

    this._dead = false;
  }

  set data(newData) {
    super.data = newData;

    this.health = newData["health"];

    if (this.healthBar) {
      this.healthBar.value = newData["health"];
    }

    if (this.sprite) {
      if (newData["direction"].x < 0) {
        this.sprite.scale.set(-1, 1);
      } else if (newData["direction"].x > 0) {
        this.sprite.scale.set(1, 1);
      }
    }

    if (this.health <= 0) {
      this.alpha = 0;
    } else {
      this.alpha = 1;
    }
  }

  update(delta) {
    this.gun.rotation = Math.atan2(this.pointing.y, this.pointing.x);
  }

  die() {
    let bloodSpill = new BloodSpill();
    bloodSpill.x = this.x;
    bloodSpill.y = this.y + this.radius;
    this.parent.addChild(bloodSpill);
  }
}
