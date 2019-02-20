const Clients = require("./Clients");

module.exports = class Game {
  constructor(io) {
    this.time = 0;
    this.io = io;
    this.clients = new Clients(this, io);
    this.entities = [];
    this.chatHistory = [];

    io.on("connection", socket => {
      socket.emit("situation", {
        time: this.time,
        entities: this.entities
      });

      socket.emit("chat-history", this.chatHistory.slice(-20));
    });
  }

  update(delta) {
    for (let entity of this.entities) {
      entity.update(delta, this);

      if (entity.ttl != null && entity.ttl <= 0) {
        this.removeEntity(entity);
      }
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
};
