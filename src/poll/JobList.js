import React, { Component } from "react";
import {
  getAllJobs,
  createOffer,
  getCurrentUser,
  hideJob
} from "../util/APIUtils";
import Job from "./Job";
import LoadingIndicator from "../common/LoadingIndicator";
import { Button, Icon, notification, Form, Input } from "antd";
import { Modal } from "react-bootstrap";

const FormItem = Form.Item;

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isLoading: false,
      show: false,
      editId: "",
      response: "",
      duration: "",
      cost: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.hideJob = this.hideJob.bind(this);
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
        this.setState({
          jobs: response,
          isLoading: false
        });
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
    return (
      <div className="newjobs-container">
        <h3>Joburi noi</h3>
        {this.state.jobs.map(
          d => (
            console.log(this.state.jobs),
            (
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
                  onClick={() => this.hideOffer(d.id)}
                  className="btn btn-danger"
                >
                  Ascunde
                </Button>
              </div>
            )
          )
        )}
        <br />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="signup-container">
              <h1 className="page-title">Accepta Oferta </h1>
              <p>Problema : {this.state.description}</p>
              <div className="signup-content">
                <Form onSubmit={this.handleSubmit} className="edditOffer-form">
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
  }

  validateResponse = response => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
}

export default JobList;
