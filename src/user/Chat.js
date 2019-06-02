import React, { Component } from "react";
import {
  sendMessage,
  getMessagesByJob,
  getAllMessages,
  getUnreadMessages,
  getAllJobsWithMessages
} from "../util/APIUtils";
import "./Chat.css";
import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      chats: [],
      message: " ",
      conversation: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getConversation = this.getConversation.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  getAllMessages() {
    let promise;
    promise = getAllJobsWithMessages();

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise.then(response => {
      console.log(response);

      this.setState({
        chats: [...this.state.chats, ...response],
        isLoading: false
      });
    });
  }

  getConversation() {
    let promise;
    promise = getMessagesByJob(this.props.jobDetails.jobId);

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise.then(response => {
      this.setState({
        conversation: [...this.state.conversation, ...response],
        isLoading: false
      });
    });
  }

  handleSubmit(event) {
    event.target.reset();
    event.preventDefault();
    const messageRequest = {
      jobId: this.props.jobDetails.jobId,
      message: this.state.message
    };

    sendMessage(messageRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim. Mesajul a fost trimis "
        });
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });

    this.setState(() => this.initialState);
    this.getConversation();
  }

  componentDidMount() {
    //this.getConversation();
    this.getAllMessages();
  }

  render() {
    console.log(this.state);
    return (
      <div className="chat">
        <h1>Chat</h1>

        {this.state.chats.map(c => (
          <p> {c.id}:</p>
        ))}
        {/* <p> Nume service : {this.props.jobDetails.serviceName}</p>
        <p> Pret : {this.props.jobDetails.cost}</p>
        <p> Descriere : {this.props.jobDetails.description}</p> */}
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
          <div className="conversationBox">
            <p>Hey</p>
            {this.state.conversation.map(d => (
              <p>
                {d.fromUser.username} : {d.message}{" "}
                <span className="time">{d.timestamp.substring(11, 16)}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
