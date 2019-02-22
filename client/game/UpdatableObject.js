import * as PIXI from "pixi.js";

export default class UpdatableObject extends PIXI.Container {
  constructor() {
    super();
  }

  update(delta) {
    for (let child of this.children) {
      if (child["update"]) {
        child.update(delta);
      }
    }
  }
}
