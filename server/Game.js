const Clients = require("./Clients");

module.exports = class Game {
  constructor(io) {
    this.time = 0;
    this.io = io;
    this.clients = new Clients(this, io);
    this.entities = [];

    io.on("connection", socket => {
      socket.emit("situation", {
        time: this.time,
        entities: this.entities
      });
    });
  }

  update(delta) {
    for (let entity of this.entities) {
      entity.update(delta);
    }

    this.io.emit("situation", {
      time: this.time,
      entities: this.entities
    });

    this.clients.update(delta);
    this.time += delta;
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.io.emit("new-entity", entity);
  }

  removeEntity(entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
    this.io.emit("remove-entity", entity);
  }
};
