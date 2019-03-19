import React, { Component } from "react";
import {
  createJob,
  getJobs,
  deleteJob,
  getOffers,
  acceptOffer
} from "../../util/APIUtils";
import "./Signup.css";

import { Form, Input, Button, notification } from "antd";

const FormItem = Form.Item;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      jobs: [],
      offers: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getOffers = this.getOffers.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const jobRequest = {
      userId: this.props.currentUser.id,
      make: this.state.make.value,
      model: this.state.model.value,
      year: this.state.year.value,
      description: this.state.description.value
    };

    createJob(jobRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Thank you! Your job has been succesfully registered. "
        });
      })
      .then(function() {
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

  acceptOffer(offerId) {
    acceptOffer(offerId);
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
    {
      this.getJobs();
    }
    {
      this.getOffers();
    }
  }
  render() {
    return (
      <div className="signup-container">
        <h3> Probleme active</h3>
        <div className="active-jobs">
          {this.state.jobs.map(j => (
            <div className="job-container">
                <h3 key = {j.id}>
                  id: {j.id}, problema: {j.description}
                </h3>
                
                {j.acceptService != 'null' &&
                j.offers.map( o => (
                <div className="offer-single" >
                  <h3> Oferta de la {o.user.name}</h3>
                  <p>Pret : {o.cost} Durata : {o.duration} ore </p>
                  <p>Descriere : {o.description}</p>
                  <Button
                  onClick={() => this.acceptOffer(o.id)}
                  className="btn btn-primary"
                  >
                  Accepta Oferta
                  </Button>
                </div>
                ))}
              <Button
                onClick={() => this.deleteJob(j.id)}
                className="btn btn-danger"
              >
                Sterge Problema
              </Button>
            </div>
          ))}
        </div>
        <h3> Oferte</h3>
          
        <h1 className="page-title">Detaliaza problema ! </h1>
        <div className="signup-content">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="Marca"
              hasFeedback
              validateStatus={this.state.make.validateStatus}
              help={this.state.make.errorMsg}
            >
              <Input
                size="large"
                name="make"
                autoComplete="off"
                placeholder="Marca"
                value={this.state.make.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateMake)
                }
              />
            </FormItem>
            <FormItem
              label="Model"
              hasFeedback
              validateStatus={this.state.model.validateStatus}
              help={this.state.model.errorMsg}
            >
              <Input
                size="large"
                name="model"
                autoComplete="off"
                placeholder="Model"
                value={this.state.model.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateModel)
                }
              />
            </FormItem>
            <FormItem
              label="An"
              hasFeedback
              validateStatus={this.state.year.validateStatus}
              help={this.state.year.errorMsg}
            >
              <Input
                size="large"
                name="year"
                type="number"
                autoComplete="off"
                placeholder="An"
                value={this.state.year.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateYear)
                }
              />
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
                // disabled={this.isFormInvalid()}
              >
                Trimite
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
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
export default Job;
