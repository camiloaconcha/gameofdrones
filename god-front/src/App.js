import React from "react";
import "./App.css";
import GameBoard from './components/containers/GameBoard'
import GameStatus from './components/containers/GameStatus'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello!</h1>
      </header>

      <GameBoard></GameBoard>
      <GameStatus></GameStatus>
    </div>
  );
}

export default App;
