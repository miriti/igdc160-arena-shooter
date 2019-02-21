import * as PIXI from "pixi.js";
import moment from "moment";

class ChatItem extends PIXI.Container {
  constructor(data) {
    super();

    let style = {
      fontFamily: "Arial",
      fontSize: 16
    };

    let string = "[" + moment(data["time"]).format("HH:mm:ss") + "] ";
    if (data["name"] != null) {
      string += data["name"] + ": " + data["message"];
      style["fill"] = 0xfdfffc;
    } else {
      string += " * " + data["message"];
      style["fill"] = 0x4cb944;
    }

    let shadowStyle = Object.assign({}, style);
    shadowStyle["fill"] = 0x0;

    let shadow = new PIXI.Text(string, shadowStyle);
    shadow.x = 1;
    shadow.y = 1;
    let text = new PIXI.Text(string, style);

    this.addChild(shadow);
    this.addChild(text);
  }
}

export default class Chat extends PIXI.Container {
  constructor(io) {
    super();

    this.chatContainer = new PIXI.Container();
    this.addChild(this.chatContainer);

    this.items = [];

    io.on("chat", chat => {
      new Audio("/audio/new-message.ogg").play();
      this.add(chat);
    });

    io.on("joined", name => {
      new Audio("/audio/new-player.ogg").play();
      this.add({ name: null, message: name + " присоединился" });
    });

    io.on("left", name => {
      this.add({ name: null, message: name + " покинул нас" });
    });

    io.on("chat-history", items => {
      items.forEach(item => {
        this.add(item);
      });
    });
  }

  add(chat) {
    const MAX_ITEMS = 7;

    if (this.items.length >= MAX_ITEMS) {
      let items = this.items.splice(0, this.items.length - MAX_ITEMS);

      items.forEach(item => {
        this.chatContainer.removeChild(item);
      });
    }

    let chatItem = new ChatItem(chat);

    this.chatContainer.addChild(chatItem);

    this.items.push(chatItem);

    this.items.forEach((item, index, array) => {
      item.y = -(array.length * item.height) + index * item.height;
    });
  }
}
