module.exports = class Client {
  constructor(socket) {
    this.socket = socket;

    this.socket.on("join", this.join);
  }

  join(name) {
    console.log("join with name %s", name);
  }
};
