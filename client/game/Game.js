import * as PIXI from "pixi.js";
import Entity from "./Entity";
import Player from "./Player";
export default class Game extends PIXI.Sprite {
  constructor(io) {
    super();

    let arena = new PIXI.Graphics();
    arena.beginFill(0xcc0000);
    arena.drawCircle(0, 0, 500);
    arena.endFill();
    this.addChild(arena);

    this.io = io;
    this.entities = new Map();

    this.keys = new Map();

    io.on("situation", situation => {
      for (let data of situation.entities) {
        this.updateEntity(data);
      }

      if (this.player) {
        this.x = -this.player.x;
        this.y = -this.player.y;
      }
    });

    io.on("new-entity", entity => {
      this.addEntity(entity);
    });

    io.on("remove-entity", entity => {
      this.removeEntity(entity);
    });

    io.on("your-player", player => {
      console.log("your-player", player);
      if (!this.player) {
        if (this.entities.has(player["ID"])) {
          this.player = this.entities.get(player["ID"]);
        } else {
          this.player = this.factory(player);
          this.entities.set(player["ID"], this.player);
          this.addChild(this.player);
        }
      }
    });

    io.on("update-entity", entity => {
      this.updateEntity(entity);
    });
  }

  updateEntity(data) {
    if (this.entities.has(data["ID"])) {
      let entity = this.entities.get(data["ID"]);
      entity.data = data;
    } else {
      this.addEntity(data);
    }
  }

  addEntity(data) {
    if (!this.entities.has(data["ID"])) {
      let newEntity = this.factory(data);
      this.entities.set(data["ID"], newEntity);
      this.addChild(newEntity);
    }
  }

  removeEntity(data) {
    if (this.entities.has(data["ID"])) {
      let entity = this.entities.get(data["ID"]);
      this.removeChild(entity);
      this.entities.delete(data["ID"]);
    }
  }

  update(delta) {
    for (let [ID, entity] of this.entities) {
      entity.update(delta);
    }
  }

  factory(data) {
    switch (data["type"]) {
      case "Player":
        return new Player(data);
      default:
        return new Entity(data);
    }
  }

  keyDown(key) {
    if (!this.keys.has(key)) {
      this.keys.set(key, Date.now());

      if (this.player) {
        switch (key) {
          // left
          case 37:
          case 65:
            this.io.emit("velocity", { x: -1 });
            break;

          // up
          case 38:
          case 87:
            this.io.emit("velocity", { y: -1 });
            break;

          // right
          case 39:
          case 68:
            this.io.emit("velocity", { x: 1 });
            break;

          // down
          case 40:
          case 83:
            this.io.emit("velocity", { y: 1 });
            break;
        }
      }
    }
  }

  keyUp(key) {
    if (this.player) {
      switch (key) {
        // left
        case 37:
        case 65:
          this.io.emit("velocity", { x: 0 });
          break;

        // up
        case 38:
        case 87:
          this.io.emit("velocity", { y: 0 });
          break;

        // right
        case 39:
        case 68:
          this.io.emit("velocity", { x: 0 });
          break;

        // down
        case 40:
        case 83:
          this.io.emit("velocity", { y: 0 });
          break;
      }
    }
    this.keys.delete(key);
  }
}