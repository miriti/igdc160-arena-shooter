import * as PIXI from "pixi.js";

export default class HealthBar extends PIXI.Container {
  constructor(max) {
    super();

    this.max = max;

    this.bar = new PIXI.Graphics();

    this.addChild(this.bar);

    this.barWidth = 100;
    this.barHeight = 10;
    this.border = 2;

    this.value = max;
  }

  draw() {
    this.bar.clear();
    this.bar.beginFill(0x246eb9);
    this.bar.drawRect(0, 0, this.barWidth, this.barHeight);
    this.bar.endFill();

    this.bar.beginFill(0x4cb944);
    this.bar.drawRect(
      this.border,
      this.border,
      (this.barWidth - this.border * 2) * (this.value / this.max),
      this.barHeight - this.border * 2
    );
    this.bar.endFill();
  }

  set value(newValue) {
    this._value = newValue;
    this.draw();
  }

  get value() {
    return this._value;
  }
}
