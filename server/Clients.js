const Client = require("./Client");

module.exports = class Clients {
  constructor(game, io) {
    this.clients = new Map();

    this.game = game;

    this.io = io;

    io.on("connection", socket => {
      let newClient = new Client(this.game, this.io, socket);
      this.clients.set(socket, newClient);
      console.log("New client connected. Total: %d", this.clients.size);

      socket.on("disconnect", () => {
        this.clients.delete(socket);
        console.log("A client disconnected. Total: %d", this.clients.size);
      });
    });
  }

  update(delta) {
    for (let [socket, client] of this.clients) {
      client.update(delta);
    }
  }
};
