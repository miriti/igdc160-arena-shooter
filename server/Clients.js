const Client = require("./Client");

module.exports = class Clients {
  constructor(io) {
    this.clients = new Map();

    io.on("connection", socket => {
      this.clients.set(socket, new Client(socket));

      socket.on("disconnect", () => {
        this.clients.delete(socket);
      });
    });
  }
};
