import * as PIXI from "pixi.js";

class TopCard extends PIXI.Container {
  constructor(data) {
    super();

    let style = {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff
    };

    let shadowStyle = Object.assign({}, style);
    shadowStyle["fill"] = 0x0;

    this.playerName = new PIXI.Text("", style);
    this.playerName_shadow = new PIXI.Text("", shadowStyle);

    this.frags = new PIXI.Text("", style);
    this.frags_shadow = new PIXI.Text("", shadowStyle);

    this.deaths = new PIXI.Text("", style);
    this.deaths_shadow = new PIXI.Text("", shadowStyle);

    this.playerName_shadow.y = 1;
    this.playerName_shadow.x = 1;

    this.frags.x = 130;
    this.frags_shadow.x = this.frags.x + 1;
    this.frags_shadow.y = this.frags.y + 1;

    this.deaths.x = this.frags.x + 100;
    this.deaths_shadow.x = this.deaths.x + 1;
    this.deaths_shadow.y = this.deaths.y + 1;

    this.addChild(this.playerName_shadow);
    this.addChild(this.playerName);

    this.addChild(this.frags_shadow);
    this.addChild(this.frags);

    this.addChild(this.deaths_shadow);
    this.addChild(this.deaths);

    this.data = data;
  }

  set data(newData) {
    this.playerName.text = this.playerName_shadow.text = newData["name"];
    this.frags.text = this.frags_shadow.text = newData["frags"];
    this.deaths.text = this.deaths_shadow.text = newData["deaths"];
  }
}

export default class Top extends PIXI.Container {
  constructor(io) {
    super();

    this.background = new PIXI.Graphics();
    this.addChild(this.background);
    this.cardsContainer = new PIXI.Container();

    this.addChild(this.cardsContainer);

    this.io = io;

    this.cards = [];

    this.title = new TopCard({ name: "Имя", frags: "Фраги", deaths: "Смерти" });
    this.cardsContainer.addChild(this.title);

    io.on("top", top => {
      this.top = top;
    });
  }

  set top(data) {
    this.cards.forEach(card => {
      this.cardsContainer.removeChild(card);
    });

    data
      .sort((a, b) => {
        return a.frags > b.frags ? -1 : 1;
      })
      .forEach((player, index) => {
        let newCard = new TopCard(player);
        newCard.y = this.title.height + index * newCard.height;
        this.cardsContainer.addChild(newCard);
        this.cards.push(newCard);
      });

    this.background.clear();
    this.background.beginFill(0x246eb9, 0.5);
    this.background.drawRect(
      -10,
      -10,
      this.cardsContainer.width + 20,
      this.cardsContainer.height + 20
    );
    this.background.endFill();
  }
}
