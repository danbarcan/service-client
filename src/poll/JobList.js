import React, { Component } from "react";
import {
  getAllJobs,
  createOffer,
  getCurrentUser,
  hideJob,
  getUnreadMessages,
  unhideJob
} from "../util/APIUtils";
import Job from "./Job";
import LoadingIndicator from "../common/LoadingIndicator";
import { Button, Icon, notification, Form, Input } from "antd";
import { Modal } from "react-bootstrap";
import Chat from "../user/Chat";

const FormItem = Form.Item;

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isLoading: false,
      show: false,
      chat: false,
      editId: "",
      response: "",
      duration: "",
      cost: "",
      availJobs: [],
      hiddenJobs: [],
      currentJobs: [],
      offeredJobs: [],
      chat: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.hideJob = this.hideJob.bind(this);
    this.unhideJob = this.unhideJob.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  acceptOffer(id) {
    this.setState({
      show: true,
      editId: id
    });
  }

  hideJob(id) {
    hideJob(id);
  }

  unhideJob(id) {
    unhideJob(id);
  }

  seeChat() {
    this.setState({
      chat: true
    });
  }

  handleSubmit(event) {
    console.log(this.props);
    event.preventDefault();
    const offerRequest = {
      serviceId: this.props.currentUser.id,
      cost: this.state.cost,
      description: this.state.description,
      duration: this.state.duration,
      jobId: this.state.editId
    };
    console.log(offerRequest);
    createOffer(offerRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim ! Oferta a fost trimisa cu succes!"
        });
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message ||
            "Oups! Ceva nu a mers corect, va rugam reincercati!"
        });
      });
  }

  getAllJobs() {
    getUnreadMessages();

    let promise;

    promise = getAllJobs();

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });

    promise
      .then(response => {
        const jobs = response;
        var availJobs = [];
        var hiddenJobs = [];
        var offeredJobs = [];
        var currentJobs = [];
        for (var i = 0; i < jobs.length; i++) {
          if (jobs[i].jobState === "AVAILABLE") {
            availJobs.push(jobs[i]);
          } else if (jobs[i].jobState === "HIDDEN") {
            hiddenJobs.push(jobs[i]);
          } else if (jobs[i].jobState === "OFFERED") {
            offeredJobs.push(jobs[i]);
          } else if (jobs[i].jobState === "ACCEPTED") {
            currentJobs.push(jobs[i]);
          }
        }
        this.setState({
          availJobs: availJobs,
          isLoading: false
        });
        this.setState({
          hiddenJobs: hiddenJobs,
          isLoading: false
        });
        this.setState({
          offeredJobs: offeredJobs,
          isLoading: false
        });
        this.setState({
          currentJobs: currentJobs,
          isLoading: false
        });

        console.log(this.state);
      })

      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getAllJobs();
    getCurrentUser();
    console.log(this.state);
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      // Reset State
      this.setState({
        jobs: [],
        isLoading: false
      });
      this.getAllJobs();
    }
  }

  render() {
    const jobViews = [];
    //console.log(this.state.jobs);
    const data = this.state.jobs;
    if (this.state.chat === false) {
      return (
        <div className="alljobs">
          <div className="activeJobs-container">
            <h3>Joburi active</h3>
            {this.state.currentJobs &&
              this.state.currentJobs.map(d => (
                <div className="job-container">
                  <h2>
                    Job de la <span>{d.user.name} :</span>
                  </h2>
                  <p>
                    <em>Masina, Model, An:</em>
                  </p>
                  <p>
                    <em>Problema:</em> <span key={d.id}>{d.description}</span>
                  </p>
                  <Button
                    onClick={() => this.seeChat()}
                    className="btn btn-success"
                  >
                    Vezi chat
                  </Button>
                </div>
              ))}
          </div>
          <br />
          <div className="newJobs-container">
            <h3>Joburi noi</h3>
            {this.state.availJobs &&
              this.state.availJobs.map(d => (
                <div className="job-container">
                  <h2>
                    Job de la <span>{d.user.name} :</span>
                  </h2>
                  <p>
                    <em>Masina, Model, An:</em>
                  </p>
                  <p>
                    <em>Problema:</em> <span key={d.id}>{d.description}</span>
                  </p>
                  <Button
                    onClick={() => this.acceptOffer(d.id, d.description)}
                    className="btn btn-success"
                  >
                    Trimite Oferta
                  </Button>
                  <Button
                    onClick={() => this.hideJob(d.id)}
                    className="btn btn-danger"
                  >
                    Ascunde
                  </Button>
                </div>
              ))}
          </div>
          <br />
          <div className="currentJobs-container">
            <h3>Oferte trimise</h3>
            {this.state.offeredJobs &&
              this.state.offeredJobs.map(d => (
                <div className="job-container">
                  <h2>
                    Job de la <span>{d.user.name} :</span>
                  </h2>
                  <p>
                    <em>Masina, Model, An:</em>
                  </p>
                  <p>
                    <em>Problema:</em> <span key={d.id}>{d.description}</span>
                  </p>

                  <Button
                    onClick={() => this.deleteOffer(d.id)}
                    className="btn btn-danger"
                  >
                    Sterge Oferta
                  </Button>
                </div>
              ))}
          </div>
          <br />
          <div className="hiddenJobs-container">
            <h3>Joburi ascunse</h3>
            {this.state.hiddenJobs &&
              this.state.hiddenJobs.map(d => (
                <div className="job-container">
                  <h2>
                    Job de la <span>{d.user.name} :</span>
                  </h2>
                  <p>
                    <em>Masina, Model, An:</em>
                  </p>
                  <p>
                    <em>Problema:</em> <span key={d.id}>{d.description}</span>
                  </p>

                  <Button
                    onClick={() => this.acceptOffer(d.id, d.description)}
                    className="btn btn-success"
                  >
                    Trimite Oferta
                  </Button>
                  <Button
                    onClick={() => this.unhideJob(d.id)}
                    className="btn btn-warning"
                  >
                    Reactiveaza
                  </Button>
                </div>
              ))}
          </div>
          <br />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              <div className="signup-container">
                <h1 className="page-title">Accepta Oferta </h1>
                <p>Problema : {this.state.description}</p>
                <div className="signup-content">
                  <Form
                    onSubmit={this.handleSubmit}
                    className="edditOffer-form"
                  >
                    <FormItem label="Durata" hasFeedback>
                      <Input
                        size="large"
                        name="duration"
                        autoComplete="off"
                        placeholder="Durata"
                        onChange={event =>
                          this.handleInputChange(event, this.validateResponse)
                        }
                      />
                    </FormItem>
                    <FormItem label="Cost" hasFeedback>
                      <Input
                        size="large"
                        name="cost"
                        type="number"
                        autoComplete="off"
                        placeholder="Cost"
                        onChange={event =>
                          this.handleInputChange(event, this.validateResponse)
                        }
                      />
                    </FormItem>
                    <FormItem label="Mesaj catre client" hasFeedback>
                      <Input
                        size="large"
                        name="description"
                        autoComplete="off"
                        placeholder="Raspuns"
                        onChange={event =>
                          this.handleInputChange(event, this.validateResponse)
                        }
                      />
                    </FormItem>

                    <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="signup-form-button"
                        onClick={this.handleClose}
                      >
                        Trimite
                      </Button>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return <Chat {...this.state} />;
    }
  }

  validateResponse = response => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
}

export default JobList;
