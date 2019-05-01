import React, { Component } from "react";
import Form from "react";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " "
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // sendMessage(this.state.value);
  }

  render() {
    console.log("rendered");
    console.log(this.props.currentUser);
    return (
      <div id="chat">
        <h1>Chat</h1>
        <h2> Oferta actuala </h2>
        <p> Nume service : {this.props.currentUser.username}</p>
        <p> Durata : </p>
        <p> Pret : </p>
        <p> Descriere : </p>
        <div class="conversation">
          <p> Mesaje primite :</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Mesaj:
              <br />
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <input
              className="ant-btn btn btn-primary"
              type="submit"
              value="Trimitere"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
