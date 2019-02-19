import * as PIXI from "pixi.js";

export default class Entity extends PIXI.Container {
  constructor(data) {
    super();


    this.velocity = new PIXI.Point();
    this.pointing = new PIXI.Point();

    this.data = data;
  }

  update(delta) {}

  set data(newData) {
    this.x = newData.x;
    this.y = newData.y;
    this.velocity.set(newData["velocity"]["x"], newData["velocity"]["y"]);
    this.pointing.set(newData["pointing"]["x"], newData["pointing"]["y"]);
  }
}
