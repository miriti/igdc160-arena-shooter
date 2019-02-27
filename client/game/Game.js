import * as PIXI from "pixi.js";
import Entity from "./Entity";
import Player from "./Player";
import Rocket from "./Rocket";
import Heal from "./Heal";
import Bullet from "./projectiles/Bullet";
import UpdatableObject from "./UpdatableObject";
import Pickup from "./Pickup";
import Explosion from "./fx/Explosion";
export default class Game extends UpdatableObject {
  constructor(io) {
    super();

    this.arenaLayer = new UpdatableObject();
    this.actionLayer = new UpdatableObject();

    this.addChild(this.arenaLayer);
    this.addChild(this.actionLayer);

    this.io = io;
    this.entities = new Map();

    this.keys = new Map();

    io.on("arena", arena => {
      let arenaFloor = new PIXI.Graphics();
      arenaFloor.beginFill(0xf5ee9e);
      arenaFloor.drawCircle(0, 0, arena["radius"]);
      arenaFloor.endFill();
      this.arenaLayer.addChild(arenaFloor);
    });

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
      if (!this.player) {
        if (this.entities.has(player["ID"])) {
          this.player = this.entities.get(player["ID"]);
        } else {
          this.player = this.entityFactory(player);
          this.entities.set(player["ID"], this.player);
          this.addChild(this.player);
        }
      }
    });

    io.on("update-entity", entity => {
      this.updateEntity(entity);
      if (this.player) {
        this.x = -this.player.x;
        this.y = -this.player.y;
      }
    });

    io.on("died", player => {
      let entity = this.entities.get(player["ID"]);
      entity.die();
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
      let newEntity = this.entityFactory(data);
      this.entities.set(data["ID"], newEntity);
      this.actionLayer.addChild(newEntity);
    }
  }

  removeEntity(data) {
    if (this.entities.has(data["ID"])) {
      let entity = this.entities.get(data["ID"]);
      entity.data = data;
      this.actionLayer.removeChild(entity);
      this.entities.delete(data["ID"]);
    }
  }

  update(delta) {
    super.update(delta);
    for (let [ID, entity] of this.entities) {
      entity.update(delta);
    }
  }

  entityFactory(data) {
    switch (data["type"]) {
      case "Player":
        return new Player(data);
      case "Rocket":
        return new Rocket(data);
      case "Heal":
        return new Heal(data);
      case "Bullet":
        return new Bullet(data);
      case "Pickup":
        return new Pickup(data);
      case "Explosion":
        return new Explosion(data);
      default:
        return new Entity(data);
    }
  }

  updateDirection() {
    let direction = {
      x:
        (this.keys.has(37) || this.keys.has(65) ? -1 : 0) +
        (this.keys.has(39) || this.keys.has(68) ? 1 : 0),
      y:
        (this.keys.has(38) || this.keys.has(87) ? -1 : 0) +
        (this.keys.has(40) || this.keys.has(83) ? 1 : 0)
    };

    this.io.emit("direction", direction);
  }

  keyDown(key) {
    if ([37, 39, 38, 40, 65, 68, 87, 83].indexOf(key) != -1) {
      if (!this.keys.has(key)) {
        this.keys.set(key, Date.now());
        this.updateDirection();
      }
    }
  }

  keyUp(key) {
    if ([37, 39, 38, 40, 65, 68, 87, 83].indexOf(key) != -1) {
      if (this.keys.has(key)) {
        this.keys.delete(key);
        this.updateDirection();
      }
    }
  }

  mouseMove(dx, dy) {
    if (this.player) {
      let pointing = { x: dx, y: dy };

      if (
        this.player.pointing.x != pointing.x ||
        this.player.pointing.y != pointing.y
      ) {
        this.io.emit("pointing", pointing);
      }
    }
  }

  mouseDown(x, y) {
    if (this.player) {
      this.io.emit("fire-on", { x, y });
    }
  }

  mouseUp() {
    if (this.player) {
      this.io.emit("fire-off");
    }
  }
}
