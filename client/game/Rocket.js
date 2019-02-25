import Entity from "./Entity";
import * as PIXI from "pixi.js";
import UpdatableObject from "./UpdatableObject";

class Smoke extends UpdatableObject {
  constructor(rocket) {
    super();

    this.rocket = rocket;

    this.x = this.original_x = rocket.x;
    this.y = this.original_y = rocket.y;

    let smoke = new PIXI.Graphics();
    smoke.beginFill(0xfdfffc);
    smoke.drawCircle(0, 0, 5);
    smoke.endFill();
    this.addChild(smoke);

    this.time = 0;
    this.totalTime = 2;
  }

  update(delta) {
    super.update(delta);

    if (this.time >= this.totalTime) {
      this.parent.removeChild(this);
    } else {
      let t = Math.min(this.time, this.totalTime) / this.totalTime;
      this.scale.set(1 + t * 5);
      this.alpha = 1 - t;
      this.time += delta;

      this.x = this.original_x + -this.rocket.pointing.x * t * 40;
      this.y = this.original_y + -this.rocket.pointing.y * t * 40;
    }
  }
}

export default class Rocket extends Entity {
  constructor(data) {
    super(data);

    new Audio("/audio/rocket.ogg").play();

    let rocket = new PIXI.Graphics();
    rocket.beginFill(0xf06543);
    rocket.drawRect(-10, -this.radius / 2, 20, this.radius);
    rocket.beginFill(0x246eb9);
    rocket.drawCircle(0, 0, this.radius);
    rocket.endFill();

    this.addChild(rocket);

    this.rotation = Math.atan2(this.pointing.y, this.pointing.x);

    this.smokeTime = 0;
  }

  update(delta) {
    super.update(delta);

    if (this.smokeTime <= 0) {
      let newSmoke = new Smoke(this);
      this.parent.addChild(newSmoke);
      this.smokeTime = 0.05;
    } else {
      this.smokeTime -= delta;
    }
  }
}
