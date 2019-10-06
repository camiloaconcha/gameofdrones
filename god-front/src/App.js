import React from "react";
import "./App.scss";
import GameBoard from './components/containers/GameBoard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello!</h1>
      </header>

      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
