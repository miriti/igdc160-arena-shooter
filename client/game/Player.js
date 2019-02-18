import Entity from "./Entity";

export default class Player extends Entity {
  constructor(data) {
    super(data);

    this.velocity = data.velocity || { x: 0, y: 0 };
  }

  set data(newData) {
    super.data = newData;
    this.velocity = newData["velocity"];
  }

  update(delta) {
    /** 
    this.x += this.velocity.x * 50.0 * delta;
    this.y += this.velocity.y * 50.0 * delta;
    */
  }
}
