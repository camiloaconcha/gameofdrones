import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class GameStatus extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:6200"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("message", data => this.setState({ response: data }));

  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <p>The player {response} Just joined</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default GameStatus;
