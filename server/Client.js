const Player = require("./Player");

module.exports = class Client {
  constructor(game, io, socket) {
    this.game = game;
    this.io = io;
    this.socket = socket;

    this.respawnTimer = 5;

    this.socket.on("join", this.join.bind(this));
    this.socket.on("disconnect", this.disconnect.bind(this));
    this.socket.on("velocity", value => {
      if (this.player && this.player.alive) {
        if (value.hasOwnProperty("x")) this.player.velocity.x = value.x;
        if (value.hasOwnProperty("y")) this.player.velocity.y = value.y;

        this.io.emit("update-entity", this.player);
      }
    });

    this.socket.on("pointing", value => {
      if (this.player && this.player.alive) {
        this.player.pointing.x = value.x;
        this.player.pointing.y = value.y;

        this.io.emit("update-entity", this.player);
      }
    });

    this.socket.on("fire-on", () => {
      if (this.player && this.player.alive && this.player.weapon != null) {
        this.player.weapon.pull();
      }
    });

    this.socket.on("fire-off", () => {
      if (this.player && this.player.alive && this.player.weapon != null) {
        this.player.weapon.release();
      }
    });

    this.socket.on("say", message => {
      if (message.trim() != "") {
        game.chat(this.player ? this.player.name : "Anon", message);
      }
    });
  }

  update(delta) {
    if (this.player) {
      if (!this.player.alive && this.respawnTimer > 0) {
        this.respawnTimer -= delta;

        if (this.respawnTimer <= 0) {
          this.player.respawn();
          this.respawnTimer = 5;
          this.io.emit("update-entity", this.player);
        }
      }
    }
  }

  join(name) {
    let num = 2;
    let originalName = name;

    while (this.game.hasPlayerName(name)) {
      name = originalName + " (" + num++ + ")";
    }

    this.io.emit("joined", name);

    this.player = new Player(name);
    this.socket.emit("your-player", this.player);
    this.game.addEntity(this.player);
    this.game.updateTop();
    console.log("%s joined", name);
  }

  disconnect() {
    if (this.player) {
      this.io.emit("left", this.player.name);
      this.game.removeEntity(this.player);

      console.log("%s disconnected", this.player.name);
    }
  }
};
