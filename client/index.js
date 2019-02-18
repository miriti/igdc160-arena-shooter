import * as PIXI from "pixi.js";

import socket from "socket.io-client";
import Game from "./game/Game";

import $ from "jquery";

window.$ = window.jQuery = $;

import "bootstrap";

import "bootstrap/dist/css/bootstrap.css";

let io = socket();

io.on("connect", () => {
  console.log("connected");
});

let app = new PIXI.Application();

app.renderer.autoResize = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

let gameContainer = new PIXI.Container();
gameContainer.addChild(new Game());

let resize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  gameContainer.x = window.innerWidth / 2;
  gameContainer.y = window.innerHeight / 2;
};

window.addEventListener("resize", resize);

resize();

app.stage.addChild(gameContainer);

document.body.appendChild(app.view);

$("#joinModal").modal("show");
