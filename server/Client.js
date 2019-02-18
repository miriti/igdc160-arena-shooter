const Player = require("./Player");

module.exports = class Client {
  constructor(game, io, socket) {
    this.game = game;
    this.io = io;
    this.socket = socket;

    this.socket.on("join", this.join.bind(this));
    this.socket.on("disconnect", this.disconnect.bind(this));
    this.socket.on("velocity", value => {
      if (this.player) {
        if (value.hasOwnProperty("x")) this.player.velocity.x = value.x;
        if (value.hasOwnProperty("y")) this.player.velocity.y = value.y;

        this.io.emit("update-entity", this.player);
      }
    });
  }

  update(delta) {
    if (this.player) {
      this.player.update(delta);
    }
  }

  join(name) {
    this.player = new Player(name);
    this.socket.emit("your-player", this.player);
    this.game.addEntity(this.player);
    console.log("%s joined", name);
  }

  disconnect() {
    if (this.player) {
      this.game.removeEntity(this.player);
      console.log("%s disconnected", this.player.name);
    }
  }
};
