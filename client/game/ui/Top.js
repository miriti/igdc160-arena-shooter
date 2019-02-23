import * as PIXI from "pixi.js";

class TopCard extends PIXI.Container {
  constructor(data) {
    super();

    let style = {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff
    };

    this.playerName = new PIXI.Text("", style);
    this.frags = new PIXI.Text("", style);
    this.deaths = new PIXI.Text("", style);

    this.frags.x = 130;
    this.deaths.x = this.frags.x + 100;

    this.addChild(this.playerName);
    this.addChild(this.frags);
    this.addChild(this.deaths);

    this.data = data;
  }

  set data(newData) {
    this.playerName.text = newData["name"];
    this.frags.text = newData["frags"];
    this.deaths.text = newData["deaths"];
  }
}

export default class Top extends PIXI.Container {
  constructor(io) {
    super();

    this.io = io;

    this.cards = [];

    this.title = new TopCard({ name: "Имя", frags: "Фраги", deaths: "Смерти" });
    this.addChild(this.title);

    io.on("top", top => {
      this.top = top;
    });
  }

  set top(data) {
    this.cards.forEach(card => {
      this.removeChild(card);
    });

    data
      .sort((a, b) => {
        return a.frags > b.frags ? -1 : 1;
      })
      .forEach((player, index) => {
        let newCard = new TopCard(player);
        newCard.y = this.title.height + index * newCard.height;
        this.addChild(newCard);
        this.cards.push(newCard);
      });
  }
}
