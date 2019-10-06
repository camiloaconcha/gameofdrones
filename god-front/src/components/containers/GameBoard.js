import React, { Component } from "react";
import Button from "./../UI/Button/Button";

class GameBoard extends Component {
  buttonClicked = () => {
    this.setState({
      purchasing: true
    });
  };

  render() {
    return (
        <div>
        <Button btnType="rock">Rock</Button>
        <Button btnType="paper">Paper</Button>
        <Button btnType="scissors">Scissors</Button>
        </div>
    );
  }
}
export default GameBoard;
