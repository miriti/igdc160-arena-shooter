import * as PIXI from "pixi.js";
import socket from "socket.io-client";
import $ from "jquery";
window.$ = window.jQuery = $;
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import Game from "./game/Game";
import Chat from "./game/ui/Chat";
import Top from "./game/ui/Top";

let io = socket();

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let app = new PIXI.Application();
app.renderer.autoResize = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

app.view.addEventListener("mousemove", event => {
  game.mouseMove(
    event.clientX - window.innerWidth / 2,
    event.clientY - window.innerHeight / 2
  );
});

app.view.addEventListener("mousedown", event => {
  game.mouseDown(
    event.clientX - window.innerWidth / 2,
    event.clientY - window.innerHeight / 2
  );
});

app.view.addEventListener("mouseup", event => {
  game.mouseUp();
});

let game = new Game(io);

let gameContainer = new PIXI.Container();
gameContainer.addChild(game);

app.stage.addChild(gameContainer);

let chatWindow = new Chat(io);
app.stage.addChild(chatWindow);

let top = new Top(io);
app.stage.addChild(top);

let resize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);

  gameContainer.x = window.innerWidth / 2;
  gameContainer.y = window.innerHeight / 2;

  chatWindow.x = 10;
  chatWindow.y = window.innerHeight - 60;

  top.x = window.innerWidth - top.width - 10;
  top.y = 10;
};

window.addEventListener("resize", resize);

resize();

let lastTime = Date.now();

function gameLoop() {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;
  game.update(delta);
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.body.appendChild(app.view);

window.addEventListener("keydown", event => {
  game.keyDown(event.keyCode);
});

window.addEventListener("keyup", event => {
  game.keyUp(event.keyCode);
});

let join = () => {
  let playerName = $("#playerName")
    .val()
    .trim();

  if (playerName.length > 2 && playerName.length < 16) {
    $("#joinModal").modal("hide");
    io.emit("join", playerName);
  } else {
    alert("Имя должно содержать от 3 до 16 символов");
  }
};

$("#joinModal").modal("show");

$("#joinButton").click(event => {
  event.preventDefault();
  join();
});

$("#playerName").keydown(event => {
  if (event.keyCode == 13) {
    join();
  }
});

let chatInput = $("#chat input");
chatInput.keydown(event => {
  event.stopImmediatePropagation();

  if (event.keyCode == 13) {
    let message = $("#chat input")
      .val()
      .trim();
    $("#chat input").val("");

    if (message != "") {
      io.emit("say", message);
    }
  }

  if (event.keyCode == 27) {
    chatInput.blur();
  }
});
