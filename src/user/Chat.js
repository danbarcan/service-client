import React, { Component } from "react";
import {
  sendMessage,
  getMessagesByJob,
  getAllMessages
} from "../util/APIUtils";
import "./Chat.css";
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
    this.getConversation = this.getConversation.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  getConversation() {
    getMessagesByJob(this.props.jobDetails.jobId);
    console.log(getMessagesByJob(this.props.jobDetails.jobId));
    console.log(getAllMessages());
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageRequest = {
      jobId: this.props.jobDetails.jobId,
      message: this.state.message
    };
    sendMessage(messageRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Thank you! Your job has been succesfully registered. "
        });
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });
  }

  render() {
    this.getConversation();

    return (
      <div className="chat">
        <h1>Chat</h1>
        <h2> Oferta actuala </h2>
        <p> Nume service : {this.props.jobDetails.jobId.serviceName}</p>
        <p> Pret : {this.props.jobDetails.jobId.cost}</p>
        <p> Descriere : {this.props.jobDetails.jobId.description}</p>
        <p> Conversatie :</p>
        <div className="chatSend">
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
          <div className="conversationBox" />
        </div>
      </div>
    );
  }
}

export default Chat;
