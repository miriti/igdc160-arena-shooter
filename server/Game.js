const Clients = require("./Clients");
const Arena = require("./Arena");
const Heal = require("./Heal");
const Pickup = require("./Pickup");
const Player = require("./Player");

module.exports = class Game {
  constructor(io) {
    this.time = 0;
    this.io = io;
    this.clients = new Clients(this, io);
    this.entities = [];
    this.chatHistory = [];
    this.arena = new Arena();

    this.spawn(Heal);
    io.on("connection", socket => {
      socket.emit("arena", this.arena);
      socket.emit("situation", {
        time: this.time,
        entities: this.entities
      });

      socket.emit("chat-history", this.chatHistory.slice(-20));
      this.updateTop();
    });

    this._sec = 0;

    this.dummy = new Player("Dummy");

    this.addEntity(this.dummy);
  }

  set second(sec) {
    if (sec != this._sec) {
      this._sec = sec;

      if (sec % 35) {
        if (this.entities.filter(e => e.type == "Heal").length == 0) {
          this.spawn(Heal);
        }
      }

      if (sec % 20 == 0) {
        if (this.entities.filter(e => e.type == "Pickup").length <= 2) {
          this.spawn(Pickup);
        }
      }

      if (sec % 5 == 0) {
        if (!this.dummy.alive) {
          this.dummy.respawn();
        }
      }
    }
  }

  update(delta) {
    this.clients.update(delta);

    for (let entity of this.entities) {
      entity.update(delta, this);

      if (entity.ttl != null && entity.ttl <= 0) {
        this.removeEntity(entity);
      }
    }

    this.second = Math.round(this.time);

    this.io.emit("situation", {
      time: this.time,
      entities: this.entities
    });

    this.time += delta;
  }

  spawn(EntityType) {
    let newEntity = new EntityType();

    let ra = Math.PI * 2 * Math.random();
    newEntity.x =
      Math.cos(ra) * (this.arena.radius - newEntity.radius) * Math.random();
    newEntity.y =
      Math.sin(ra) * (this.arena.radius - newEntity.radius) * Math.random();
    this.addEntity(newEntity);
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.io.emit("new-entity", entity);
  }

  removeEntity(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
    this.io.emit("remove-entity", entity);
  }

  hasPlayerName(name) {
    for (let [socket, client] of this.clients.clients) {
      if (client.player && client.player.name == name) {
        return true;
      }
    }

    return false;
  }

  chat(name, message) {
    let chatItem = { time: new Date(), name, message };
    this.chatHistory.push(chatItem);
    this.io.emit("chat", chatItem);
  }

  getEntityByID(id) {
    for (let i in this.entities) {
      if (this.entities[i].ID == id) {
        return this.entities[i];
      }
    }

    return null;
  }

  updateTop() {
    this.io.emit("top", this.entities.filter(e => e.type == "Player"));
  }
};
