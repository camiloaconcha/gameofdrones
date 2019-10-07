import React, { Component } from "react";
import "./PlayersBoard.css";
import socketIOClient from "socket.io-client";

class PlayersBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:6200"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit("message", this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="name">
          <input
            id="name"
            className="name-input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Type here your name!"
          />
        </label>
        <input className="submit-button" type="submit" value="Join!" />
      </form>
    );
  }
}

export default PlayersBoard;
