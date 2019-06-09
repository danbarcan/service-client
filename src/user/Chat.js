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
      message: " ",
      conversation: [],
      jobId: "",
      activeConversationId: "",
      currentUserRole: ""
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
    // only get conversations for currentUser
    promise.then(response => {
      let userResponse = [];
      if (this.state.currentUserRole === "ROLE_SERVICE") {
        for (var i = 0, len = response.length; i < len; i++) {
          if (response[i].acceptedService.id == this.state.currentUserId) {
            userResponse.push(response[i]);
          }
        }

        // userResponse = response.find(
        //   // find trebuie sa intre in object ca sa gaseasca valoarea useridului
        //   x => x.acceptedService.id === this.state.currentUserId
        // );
      } else {
        for (var i = 0, len = response.length; i < len; i++) {
          if (response[i].id == this.state.currentUserId) {
            userResponse.push(response[i]);
          }
        }
      }
      console.log(response);
      console.log(this.state.currentUserId);

      console.log(userResponse);

      this.setState({
        chats: userResponse,
        isLoading: false
      });
    });
  }

  getConversation(id) {
    getMessagesByJob(id).then(response => {
      console.log(response);
      // daca in response arrayu e gol facem setstate la conversation cu nimic . altfel trimitem ce avem acuma.
      // Aratat numai conversatiile care au userul in ele in loc sa aratam toate conversatiile. Daca in job exista user id-ul gen.
      this.setState({
        jobId: id,
        conversation: [...response],
        isLoading: false
      });
    });

    this.setState({
      activeConversationId: id,
      isLoading: true
    });
    console.log(this.state.conversation);
  }

  handleSubmit(event) {
    event.target.reset();
    event.preventDefault();
    const message = this.state.message;
    const messageRequest = {
      jobId: this.state.activeConversationId,
      message: message
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
      })
      .then(
        this.setState({
          message: ""
        })
      )
      .then(
        console.log("before sending the getconversation request"),
        this.getConversation(this.state.activeConversationId)
      );

    this.setState(() => this.initialState);

    console.log("mesajul care l-am trimis");
    console.log(this.state.message);
  }

  componentDidMount() {
    this.getAllMessages();
    getCurrentUser().then(response => {
      console.log(response);
      this.setState({
        currentUserRole: response.role,
        currentUserId: response.id
      });
      console.log(this.state);
    });
  }

  componentWillReceiveProps() {
    this.getConversation(this.state.activeConversationId);
  }

  render() {
    return (
      <div className="chat">
        <h1>Chat</h1>
        <div className="chatIcons">
          {this.state.chats &&
            this.state.chats.map(c => (
              <Button
                className="chatIcon"
                onClick={() => this.getConversation(c.id)}
              >
                {c.user.name.substring(0, 1)}
              </Button>
            ))}
        </div>
        <div className="chatSend">
          <Form onSubmit={this.handleSubmit} className="chat-form">
            <FormItem>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="message"
                value={this.state.message}
                type="text"
                placeholder="Mesaj"
                onChange={event => this.handleChange(event)}
              />
            </FormItem>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={!this.state.message}
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
