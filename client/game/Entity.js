import * as PIXI from "pixi.js";
import UpdatableObject from "./UpdatableObject";

export default class Entity extends UpdatableObject {
  constructor(data) {
    super();

    this.velocity = new PIXI.Point();
    this.pointing = new PIXI.Point();
    this.direction = new PIXI.Point();

    this.data = data;
  }

  set data(newData) {
    this.x = newData.x;
    this.y = newData.y;
    this.velocity.set(newData["velocity"]["x"], newData["velocity"]["y"]);
    this.pointing.set(newData["pointing"]["x"], newData["pointing"]["y"]);
    this.radius = newData["radius"];
  }
}
