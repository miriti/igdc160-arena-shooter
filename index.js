const express = require("express");
const www = express();
const http = require("http").Server(www);
const io = require("socket.io")(http);
const PORT = 8080;

const Clients = require("./server/Clients");

const clients = new Clients(io);

www.use((req, res, next) => {
  console.log("[%s] %s %s", new Date(), req.method, req.url);
  next();
});

www.use(express.static("./www"));

http.listen(PORT, () => {
  console.log("[%s] WWW Server is started at *:%d", new Date(), PORT);
});
