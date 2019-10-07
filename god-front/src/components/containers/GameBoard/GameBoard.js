import React, { Component } from "react";
import Button from "./../../UI/Button/Button";
import socketIOClient from "socket.io-client";

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:6200"
    };
    this.onGameItemClick = this.onGameItemClick.bind(this);

  }

  onGameItemClick(event) {
    console.log(event);

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit("turn", event);
    console.log("Emitted");
    
  }

  render() {
    return (
      <div className="game-board">
        <Button
          btnType="rock"
          onGameItemClick = {this.onGameItemClick}
        >
          Rock
        </Button>
        <Button btnType="paper" onGameItemClick = {this.onGameItemClick}>
          Paper
        </Button>
        <Button btnType="scissors" onGameItemClick = {this.onGameItemClick}>
          Scissors
        </Button>
      </div>
    );
  }
}
export default GameBoard;
