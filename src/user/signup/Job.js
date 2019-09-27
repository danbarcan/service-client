import React, { Component } from "react";

import {
  createJob,
  getJobs,
  deleteJob,
  getOffers,
  acceptOffer,
  getAllCars,
  getCategories
} from "../../util/APIUtils";
import "./Signup.css";
import { withRouter } from "react-router-dom";
import { Form, Button, notification, Select } from "antd";
import { Modal } from "react-bootstrap";
import Chat from "../Chat";
import TextArea from "antd/lib/input/TextArea";
import serviceImage from "../../img/service.jpg";
import { Icon } from 'antd';

import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';



const FormItem = Form.Item;

const { Option } = Select;
const children = [];

getCategories().then(response => {
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    children.push(<Option key={i}>{response[i].description}</Option>);
  }
})


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
      show: false,
      city: '',
      query: '',
      address: '',
      latLng: '',
      categories: [],
      unreadMessage: false
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
    this.seeChat = this.seeChat.bind(this);
    this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
  }



  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address).then(this.setState({ address: address }))
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ latLng: latLng }))
      .catch(error => console.error('Error', error));
  };



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


  handleMultipleSelect(value) {
    console.log(`selected ${value}`);
    this.setState({
      categories: value
    })
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
    for (var i = 0; i < this.state.cars.length; i++) {
      if (this.state.chosenCar === this.state.cars[i].id) {
        var jobRequest = {
          make: this.state.cars[i].make,
          model: this.state.cars[i].model,
          year: this.state.cars[i].year,
          userId: this.props.currentUser.id,
          description: this.state.description.value,
          email: this.state.email.value,
          lat: this.state.latLng.lat,
          lng: this.state.latLng.lng,
          categories: this.state.categories,
          carId: this.state.chosenCar
        }
      }
    }

    createJob(jobRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim ! Cererea a fost inregistrata ! "
        });
      })
      .then(function () {
        window.location.reload();
      })
      .catch(error => {
        notification.error({
          message: "Polling App",
          description:
            error.message || "Ne pare rau ! Ceva nu a functionat . Va rugam reincercati !"
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
        console.log(response);
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

  acceptOffer(offerId, jobId, serviceName, cost, duration, description) {
    acceptOffer(offerId)
      .then(() => {
        this.setState({
          jobDetails: {
            jobId: jobId,
            serviceName: serviceName,
            duration: duration,
            cost: cost,
            description: description
          },
          chat: true,
          jobId: jobId

        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  seeChat(jobId, serviceName, cost, duration, description) {
    this.setState({
      jobId: jobId,
      chat: true,
      jobDetails: {
        jobId: jobId,
        serviceName: serviceName,
        duration: duration,
        cost: cost,
        description: description
      },
    })
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
    this.getJobs();
    this.getOffers();

  }

  getOffers() {
    return (
      < div className="active-jobs" >

        {
          this.state.jobs.map(j => (
            <div className="job-container" key={j.id}>
              <h2>
                {/* If there is a car show car details to make it clear which car is getting fixed */}
                {j.car &&
                  <span>
                    Masina : {j.car.make} {j.car.model} {j.car.year}
                  </span>
                }
                <span>
                  id: {j.id}, descriere: {j.description}
                </span>

              </h2>

              <Button
                onClick={() => this.deleteJob(j.id)}
                className="btn btn-danger"
              >
                Sterge
                </Button>

              <hr></hr>
              {j.acceptedService ?
                (
                  <div className="offer-container">
                    <h2> Service-ul care se va ocupa de reparatie este : {j.acceptedService.name} </h2>
                    <img src={serviceImage} alt="Serviceimg" />
                    <p>{j.acceptedService.rating} <Icon className="rating-star" type="star" theme="filled" /></p>
                    <p>Adresa: {j.location}</p>
                    <p>Numar : {j.acceptedService.phoneNumber}</p>
                    <p>Pret : {j.offers[0].cost} Ron </p>
                    <p> Durata : {j.offers[0].duration} Ore </p>
                    <p>Mesaj : {j.description}</p>
                    <Button onClick={() => this.seeChat(j.id, j.acceptedService.name, j.offers[0].cost, j.offers[0].duration, j.description)} className="btn btn-success" >
                      Vezi conversatie
                    </Button>
                  </div>
                ) : (
                  j.offers.length > 0 ?
                    (j.offers.map(o => (
                      <div className="offer-container" key={o.id}>
                        <img src={serviceImage} alt="Serviceimg" />
                        <h3>Oferta de la {o.user.username}</h3>
                        <p>{o.rating} <Icon className="rating-star" type="star" theme="filled" /></p>
                        <p>Adresa: </p>
                        <p>Pret : {o.cost} Ron </p>
                        <p> Durata : {o.duration} Ore </p>
                        <p>Mesaj : {o.description}</p>

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
                    ))
                    ) : (
                      /* If there are no offers currently display , here is where the message is displayed */
                      <p>Inca nu am gasit suficient oferte pentru cererea dumneavoastra. Va rugam reveniti</p>
                    )
                )
              }
            </div>
          ))
        }
      </div>
    )
  }

  render() {


    if (this.state.chat === false) {
      return (

        <div className="signup-container">
          <Button
            onClick={this.handleShow}
            className="special btn btn-primary "
          >
            Creaza cerere
          </Button>
          <h3> Cereri active</h3>
          {this.getOffers()}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <h1 className="page-title"> Cu ce te putem ajuta ? </h1>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem
                  label=" Alegeti masina: ">
                  {this.state.cars.map(c => (
                    <Button name="car" key={c.id} onClick={() => this.chooseCar(c.id)}
                      value={c.id}>{c.make} - {c.model} - {c.year}
                    </Button>
                  ))
                  }
                </FormItem>
                <FormItem
                  label="Alegeti categoria reparatiei">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['Toate Categoriile']}
                    onChange={this.handleMultipleSelect}
                  >
                    {children}
                  </Select>
                </FormItem>

                <FormItem
                  label="Descrie problema masinii"
                  hasFeedback
                  validateStatus={this.state.description.validateStatus}
                  help={this.state.description.errorMsg}
                >
                  <TextArea
                    size="large"
                    name="description"
                    type="text"
                    autoComplete="off"
                    placeholder="Detaliaza cu ce te poate ajuta service-ul"
                    value={this.state.description.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateDescription)
                    }
                  />
                </FormItem>

                <FormItem label="Locatie">
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: 'Ex: Bucuresti, Cluj',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>


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
