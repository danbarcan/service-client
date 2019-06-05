import React, { Component } from "react";
import {
  sendMessage,
  getMessagesByJob,
  getAllMessages,
  getUnreadMessages,
  getCurrentUser,
  getAllJobsWithMessages
} from "../util/APIUtils";
import "./Chat.css";
import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: "",
      value: "",
      chats: [],
      message: "",
      conversation: [],
      jobId: ""
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
      let userResponse;
      userResponse = response.find(x => x.id === this.state.currentUserId);
      this.setState({
        chats: [userResponse],
        isLoading: false
      });
    });
    console.log(this.state);
  }

  getConversation(id) {
    let promise;
    promise = getMessagesByJob(id);

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise.then(response => {
      // daca in response arrayu e gol facem setstate la conversation cu nimic . altfel trimitem ce avem acuma.
      // Aratat numai conversatiile care au userul in ele in loc sa aratam toate conversatiile. Daca in job exista user id-ul gen.
      console.log(response);
      this.setState({
        jobId: id,
        conversation: [...this.state.conversation, ...response],
        isLoading: false
      });
    });
  }

  handleSubmit(event, id) {
    event.target.reset();
    event.preventDefault();
    const messageRequest = {
      jobId: id,
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
  }

  componentDidMount() {
    //this.getConversation();
    this.getAllMessages();
    getCurrentUser().then(response => {
      this.setState({
        currentUserId: response.id
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="chat">
        <h1>Chat</h1>

        {this.state.chats &&
          this.state.chats.map(c => (
            <div className="chatIcons">
              <Button
                className="chatIcon"
                onClick={() => this.getConversation(c.id)}
              >
                {c.user.name.substring(0, 1)}
              </Button>
            </div>
          ))}

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
            {this.state.conversation &&
              this.state.conversation.map(d => (
                <p>
                  {d.fromUser.username} : {d.message}
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
