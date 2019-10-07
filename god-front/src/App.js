import React from "react";
import "./App.css";
import GameBoard from "./components/containers//GameBoard/GameBoard";
import GameStatus from "./components/containers/GameStatus/GameStatus";
import PlayersBoard from "./components/containers/PlayersBoard/PlayersBoard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to : Rock Paper Scissors!</h1>
      </header>
      <div className="gameContainer">
        <GameBoard></GameBoard>
        <GameStatus></GameStatus>
        <PlayersBoard></PlayersBoard>
      </div>
    </div>
  );
}

export default App;
