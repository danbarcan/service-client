import React, { Component } from "react";

import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.validate(inputValue);

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageRequest = {
      id: this.props.currentUser.username,
      message: this.state.message
    };
  }

  render() {
    console.log("rendered");
    console.log(this.props);
    console.log(this.state);
    return (
      <div id="chat">
        <h1>Chat</h1>
        <h2> Oferta actuala </h2>
        <p> Nume service : </p>
        <p> Durata : </p>
        <p> Pret : </p>
        <p> Descriere : </p>
        <div class="conversation">
          <p> Mesaje primite :</p>
          <Form onSubmit={this.handleSubmit} className="chat-form">
            <FormItem>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="message"
                type="text"
                placeholder="Mesaj"
                onChange={event => this.handleChange(event)}
              />
            </FormItem>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="chat-form-button"
            >
              Trimite mesaj
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Chat;
