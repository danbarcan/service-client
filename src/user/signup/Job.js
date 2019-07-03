import React, { Component } from "react";
import {
  createJob,
  getJobs,
  deleteJob,
  getOffers,
  acceptOffer,
  getAllCars
} from "../../util/APIUtils";
import "./Signup.css";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { Modal } from "react-bootstrap";
import Chat from "../Chat";

const FormItem = Form.Item;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: false,
      make: {
        value: ""
      },
      model: {
        value: ""
      },
      year: {
        value: ""
      },
      description: {
        value: ""
      },
      email: {
        value: ""
      },
      jobs: [],
      offers: [],
      jobId: "",
      currentUser: this.props.currentUser.id,
      cars: [],
      chosenCar: '',
      show: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getOffers = this.getOffers.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.getCars = this.getCars.bind(this);
    this.chooseCar = this.chooseCar.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  chooseCar(id) {
    this.setState({
      chosenCar: id
    });

  }

  getCars() {
    let promise;
    promise = getAllCars(this.props.currentUser.id);
    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });
    promise
      .then(response => {
        this.setState({
          cars: response,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(jobRequest);
    for (var i = 0; i < this.state.cars.length; i++) {
      if (this.state.chosenCar === this.state.cars[i].id) {
        var jobRequest = {
          make: this.state.cars[i].make,
          model: this.state.cars[i].model,
          year: this.state.cars[i].year,
          userId: this.props.currentUser.id,
          description: this.state.description.value,
          email: this.state.email.value
        }
      }
    }
    console.log(jobRequest);
    createJob(jobRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Thank you! Your job has been succesfully registered. "
        });
      })
      .then(function () {
        window.location.reload();
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });
  }
  deleteJob(jobId) {
    if (window.confirm("Sigur doriti sa stergeti aceasta cerere ?")) {
      alert("Va multumim !");
      deleteJob(jobId);
      let state = this.state.jobs;
      let updatedJobs = [...state].filter(jobs => jobs.id !== jobId);
      state = updatedJobs;
      this.setState({ jobs: updatedJobs });
    }
  }

  getJobs() {
    let promise;
    promise = getJobs(this.props.currentUser.id);
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

  getOffers() {
    let promise;
    promise = getOffers(this.props.currentUser.id);
    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true
    });
    promise
      .then(response => {
        this.setState({
          offers: response,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  acceptOffer(offerId, jobId, serviceName, cost, description) {
    acceptOffer(offerId)
      .then(() => {
        this.setState({
          jobDetails: {
            jobId: jobId,
            serviceName: serviceName,
            cost: cost,
            description: description
          },
          chat: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  isFormInvalid() {
    return !(
      this.state.make.validateStatus === "success" &&
      this.state.model.validateStatus === "success" &&
      this.state.year.validateStatus === "success" &&
      this.state.description.validateStatus === "success"
    );
  }

  componentDidMount() {

    this.getCars();

    {
      this.getJobs();
    }
    {
      this.getOffers();
    }
  }

  render() {
    console.log(this.state);
    if (this.state.chat == false) {
      return (

        <div className="signup-container">
          <Button
            onClick={this.handleShow}
            className="btn btn-danger"
          >
            Adauga Problema
          </Button>
          <h3> Probleme active</h3>
          <div className="active-jobs">
            {this.state.jobs.map(j => (
              <div className="job-container">
                <h2>
                  <span>
                    id: {j.id}, problema: {j.description}
                  </span>
                </h2>
                <Button
                  onClick={() => this.deleteJob(j.id)}
                  className="btn btn-danger"
                >
                  Sterge
                </Button>
                {j.offers.map(o => (
                  <div className="offer-container">
                    <h3>Oferta de la {o.user.username}</h3>
                    <p>Rating : {o.rating}</p>
                    <p>Pret : {o.cost}</p>
                    <p>Durata : {o.duration}</p>
                    <p>Descriere : {o.description}</p>
                    <Button
                      onClick={() =>
                        this.acceptOffer(
                          o.id,
                          j.id,
                          o.user.username,
                          o.cost,
                          o.description
                        )
                      }
                      className="btn btn-success"
                    >
                      Accept
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <h1 className="page-title">Detaliaza problema ! </h1>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem>
                  {this.state.cars.map(c => (
                    <Button name="car" onClick={() => this.chooseCar(c.id)}
                      value={c.id}>{c.make} - {c.model} - {c.year}
                    </Button>
                  ))
                  }
                </FormItem>

                <FormItem
                  label="Descriere"
                  hasFeedback
                  validateStatus={this.state.description.validateStatus}
                  help={this.state.description.errorMsg}
                >
                  <Input
                    size="large"
                    name="description"
                    type="text"
                    autoComplete="off"
                    placeholder="Descriere"
                    value={this.state.description.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateDescription)
                    }
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
        </div >
      );
    } else {
      return <Chat {...this.state} />;
    }
  }

  validateMake = make => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
  validateModel = model => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
  validateYear = year => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
  validateDescription = description => {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };
}
export default withRouter(Job);
