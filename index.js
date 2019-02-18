const express = require("express");
const www = express();
const http = require("http").Server(www);
const io = require("socket.io")(http);
const PORT = 8080;

const Game = require("./server/Game");

const game = new Game(io);

let lastTime = Date.now();

const gameLoop = () => {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  game.update(delta);
};

setInterval(gameLoop, 1000 / 60);

www.use((req, res, next) => {
  console.log("[%s] %s %s", new Date(), req.method, req.url);
  next();
});

www.use(express.static("./www"));

http.listen(PORT, () => {
  console.log("[%s] WWW Server is started at *:%d", new Date(), PORT);
});
