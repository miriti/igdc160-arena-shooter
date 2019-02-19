const Player = require("./Player");
const Rocket = require("./Rocket");

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

    this.socket.on("pointing", value => {
      if (this.player) {
        this.player.pointing.x = value.x;
        this.player.pointing.y = value.y;

        this.io.emit("update-entity", this.player);
      }
    });

    this.socket.on("fire-on", () => {
      if (this.player) {
        this.player.fire = true;
        this.io.emit("update-entity", this.player);

        let newRocket = new Rocket();
        newRocket.x = this.player.x;
        newRocket.y = this.player.y;
        newRocket.velocity.x = this.player.pointing.x;
        newRocket.velocity.y = this.player.pointing.y;
        this.game.addEntity(newRocket);
      }
    });

    this.socket.on("fire-off", () => {
      if (this.player) {
        this.player.fire = false;
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
    let num = 2;
    let originalName = name;

    while (this.game.hasPlayerName(name)) {
      name = originalName + " (" + num++ + ")";
    }

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
