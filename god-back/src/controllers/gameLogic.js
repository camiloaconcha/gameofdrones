class GameLogic {
  constructor(player1, player2) {
    this._players= [player1,player2];
    this._turns= [null,null];

    
    this._sendToPlayers('Game Starts!');
  }

  _sendToPlayer(playerIndex, message) {
    this._players[playerIndex].emit('message', message);
  }


  _sendToPlayers(message) {
    this._players.forEach(player => {
      player.emit('message',message);
    });
  }

  _onTurn(playerNumber, turn) {
    this._turns[playerNumber] = turn;
    this._sendToPlayer(playerNumber, `Selection is: ${turn}`);

    this._checkGameOver();
  }

  _checkGameOver() {
    const turns = this._turns;

    if (turns[0] && turns[1]) {
      this._sendToPlayers('Game over ' + turns.join(' : '));
      this._getGameResult();
      this._turns = [null, null];
      this._sendToPlayers('Next Round!!!!');
    }
  }


  _getGameResult() {
    console.log("GETTING RESULTS")
    const p0 = this._decodeTurn(this._turns[0]);
    const p1 = this._decodeTurn(this._turns[1]);

    const distance = (p1 - p0 + 3) % 3;

    switch (distance) {
      case 0:
        this._sendToPlayers('Draw!');
        break;

      case 1:
        this._sendWinMessage(this._players[0], this._players[1]);
        break;

      case 2:
        this._sendWinMessage(this._players[1], this._players[0]);
        break;
    }
  }

  _sendWinMessage(winner, loser) {
    winner.emit('message', 'You won!');
    loser.emit('message', 'You lost.');
  }

  _decodeTurn(turn) {
    switch (turn) {
      case 'rock':
        return 0;
      case 'scissors':
        return 1;
      case 'paper':
        return 2;
      default:
        throw new Error(`Could not decode turn ${turn}`);
    }
  }
}

module.exports = GameLogic;
