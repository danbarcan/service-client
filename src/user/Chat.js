import React, { Component } from "react";
import {
  sendReview,
  sendMessage,
  getMessagesByJob,
  getCurrentUser,
  getAllJobsWithMessages,
} from "../util/APIUtils";
import "./Chat.css";
import { Modal } from "react-bootstrap";
import TextArea from "antd/lib/input/TextArea";
import { Form, Input, Button, Icon, notification, Rate } from "antd";
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
      currentUserRole: "",
      showModal: false,
      reviewText: " ",
      stars: 0

    };

    console.log(this.state);
    console.log(this.props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getConversation = this.getConversation.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
    this.review = this.review.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleClose(event) {
    this.setState({
      showModal: false
    })
  }



  getAllMessages() {

    // only get conversations for currentUser
    getAllJobsWithMessages().then(response => {
      let userResponse = [];
      for (var i = 0, len = response.length; i < len; i++) {
        if (this.state.currentUserRole === "ROLE_SERVICE") {

          if (response[i].acceptedService.id === this.state.currentUserId) {
            console.log('service');
            userResponse.push(response[i]);
          }
        } else { // If normal user
          if (response[i].id === this.state.currentUserId) {
            userResponse.push(response[i]);
          }
        }

        this.setState({
          chats: userResponse,
          isLoading: false
        });
      }
    })
  }

  getConversation(id) {
    getMessagesByJob(id)
      .then(response => {
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

  handleReview(event) {
    event.target.reset();
    const review = this.state.reviewText;
    const reviewRequest = {
      jobId: this.props.jobDetails.jobId,
      description: review,
      rating: this.state.stars
    }

    sendReview(reviewRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim. Mesajul a fost trimis "
        })
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Ne cerem scuze nu am putut trimite recenzia. Va rugam reincercati"
        });
      })
      .then(
        this.setState({
          reviewStars: 0,
          reviewText: " "
        })
      )

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
        })
        this.setState({
          conversation: [...response],
          isLoading: false
        });
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Ne cerem scuze nu am putut trimite mesajul. Va rugam reincercati"
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

  }

  review(id) {
    this.setState({
      showModal: true
    })
  }

  handleRatingChange(value) {
    this.setState({
      stars: value
    })
  }


  componentDidMount() {

    this.getAllMessages();
    getCurrentUser().then(response => {
      if (response.role === 'ROLE_USER') {
        console.log(this.props.jobId);
        this.getConversation(this.props.jobId)
        this.interval = setInterval(() => {
          this.getConversation(this.props.jobId);
        }, 5000)
      } else {
        this.getConversation(this.props.chatId)
        this.interval = setInterval(() => {
          this.getConversation(this.props.chatId);
        }, 5000)
      }
      this.setState({
        currentUserRole: response.role,
        currentUserId: response.id
      });
    });


  }

  componentWillMount() {
    this.getConversation(this.props.chatId);
    clearInterval(this.interval);

  }

  componentWillReceiveProps() {
    this.getConversation(this.state.activeConversationId);
  }

  render() {
    console.log(this.props)
    return (
      <div className="chat">
        <div className="chat__heading">
          <h1>Conversatie cu service-ul {this.props.jobId}</h1>
          <p>Va rugam stabiliti detaliile reparatiei apoi apasati pe butonul "Reparatia s-a terminat" </p>

        </div>
        <div className="chat__container" >

          {/* 
        
        <div className="chatIcons">
          {this.state.chats &&
            this.state.chats.map(c => (
              <Button key={c.id}
                className="chatIcon"
                onClick={() => this.getConversation(c.id)}
              >
                {c.user.name.substring(0, 1)}
              </Button>
            ))
          }
        </div> */}

          <div className="chat__box">

            <Form onSubmit={this.handleSubmit} className="chat__form">
              <FormItem>
                <Input
                  prefix={<Icon type="mail" />}
                  size="large"
                  name="message"
                  value={this.state.message}
                  type="text"
                  placeholder="Mesaj"
                  required
                  onChange={event => this.handleChange(event)}
                />
              </FormItem>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                //disabled={!this.state.message}
                className="chat-form-button"
              >
                Trimite mesaj
            </Button>
            </Form>
            <div className="conversationBox">
              <p>Hey</p>
              {this.state.conversation &&
                this.state.conversation.map(d => (
                  <p key={d.id}>
                    {d.fromUser.username} : {d.message}
                    <span className="time">{d.timestamp.substring(11, 16)}</span>
                  </p>
                ))}
            </div>
          </div>
          <div className="chat__details">
            <h2> Detaliile cererii si oferta acceptata:</h2>
            <h3>
              <br></br>

              Pret: {this.props.jobDetails.cost} Ron
              <br></br>
              Durata: {this.props.jobDetails.duration} Ore
              <br></br>
              Descriere: {this.props.jobDetails.description}
            </h3>
            <Button type="primary" className="btn btn-warning" size="large" onClick={() => this.review(this.props.jobDetails.jobId)}> Reparatia s-a terminat !</Button>

          </div>

        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h1 className="page-title"> Cum a fost reparatia ? </h1>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleReview} className="signup-form">
              <Rate value={this.state.stars} onChange={this.handleRatingChange}></Rate>

              <FormItem
                label="Descrie cum a fost reparatia"
                hasFeedback>
                <Input
                  size="large"
                  name="reviewText"
                  value={this.state.reviewText}
                  type="text"
                  required
                  onChange={event => this.handleChange(event)}
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="signup-form-button"
                >
                  Trimite
                </Button>
              </FormItem>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}



export default Chat;
