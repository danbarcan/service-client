import React, { Component } from "react";
import {
  getAllJobs,
  createOffer,
  getCurrentUser,
  hideJob,
  getUnreadMessages,
  unhideJob,
  deleteOffer
} from "../util/APIUtils";
import { Button, notification, Form, Input, Icon } from "antd";
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
      chatId: "",
      editId: "",
      response: "",
      duration: {
        value: ""
      },
      cost: {
        value: ""
      },
      description: {
        value: ''
      },
      availJobs: [],
      hiddenJobs: [],
      currentJobs: [],
      offeredJobs: [],
      showActive: false,
      showNew: false,
      showSent: false,
      showHidden: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.hideJob = this.hideJob.bind(this);
    this.unhideJob = this.unhideJob.bind(this);
    this.showActiveOnly = this.showActiveOnly.bind(this);
    this.showNew = this.showNew.bind(this);
    this.showSent = this.showSent.bind(this);
    this.showHidden = this.showHidden.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
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
    console.log(this.state.show);
  }

  showActiveOnly() {
    this.setState({
      showActive: true,
      showNew: false,
      showHidden: false,
      showSent: false,
    });
  }

  showNew() {
    this.setState({
      showNew: true,
      showHidden: false,
      showSent: false,
      showActive: false
    });
  }

  showHidden() {
    this.setState({
      showHidden: true,
      showSent: false,
      showActive: false,
      showNew: false,
    })
  }

  showSent() {
    this.setState({
      showSent: true,
      showActive: false,
      showNew: false,
      showHidden: false,
    })
  }

  hideJob(offerId) {
    hideJob(offerId);

    let availJobsArray = this.state.availJobs;
    let hiddenJobsArray = this.state.hiddenJobs;

    Object.keys(availJobsArray).forEach((key) => {

      if (availJobsArray[key].id === offerId) {
        hiddenJobsArray.push(availJobsArray[key]);
        this.setState({ hiddenJobs: hiddenJobsArray })
      }
    })

    let updatedJobs = [...availJobsArray].filter(jobs => jobs.id !== offerId);
    this.setState({ availJobs: updatedJobs });
    notification.success({
      message: "Smart Service",
      description: "Multumim ! Cererea a fost ascunsa !"
    });
  }

  unhideJob(offerId) {
    unhideJob(offerId);
    let availJobsArray = this.state.availJobs;
    let hiddenJobsArray = this.state.hiddenJobs;

    Object.keys(hiddenJobsArray).forEach((key) => {

      if (hiddenJobsArray[key].id === offerId) {
        availJobsArray.push(hiddenJobsArray[key]);
        this.setState({ availJobs: availJobsArray })
      }
    })
    let updatedJobs = [...hiddenJobsArray].filter(jobs => jobs.id !== offerId);
    this.setState({ hiddenJobs: updatedJobs });
    notification.success({
      message: "Smart Service",
      description: "Multumim ! Oferta a fost afisata din nou si se afla in Cereri Active!"
    });
  }

  seeChat(id) {
    var item = this.state.currentJobs[0].offers[0]

    this.setState({
      chat: true,
      chatId: id,
      jobDetails: {
        cost: item.cost,
        description: item.description,
        duration: item.duration
      }
    });
  }

  handleSubmit(event) {
    console.log(this.props);
    event.preventDefault();
    const offerRequest = {
      serviceId: this.props.currentUser.id,
      cost: this.state.cost.value,
      description: this.state.description.value,
      duration: this.state.duration.value,
      jobId: this.state.editId
    };
    console.log(offerRequest);
    createOffer(offerRequest)
      .then(response => {
        notification.success({
          message: "Smart Service",
          description: "Multumim ! Oferta a fost trimisa cu succes!"
        });
      })
      .catch(error => {
        notification.error({
          message: "Smart Service",
          description:
            error.message ||
            "Oups! Ceva nu a mers corect, va rugam reincercati!"
        });
      });
  }

  getAllJobs() {
    getUnreadMessages().then(response => {
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].value);
      }
    })

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

  isFormInvalid() {
    return !(
      this.state.cost.validateStatus === "success" &&
      this.state.duration.validateStatus === "success" &&
      this.state.description.validateStatus === "success"
    );
  }

  componentDidMount() {
    this.getAllJobs();
    getCurrentUser();
    console.log(this.state);
  }

  deleteOffer(id) {
    if (window.confirm("Sigur doriti sa stergeti aceasta cerere ?")) {
      alert("Va multumim !");
      deleteOffer(id);
      let state = this.state.offeredJobs;
      let updatedJobs = [...state].filter(jobs => jobs.id !== id);
      state = updatedJobs;
      this.setState({ offeredJobs: updatedJobs });
    }
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
    const menu =
      <ul className="services-menu">
        <li><Button className={this.state.showActive ? 'active' : ''} onClick={() => this.showActiveOnly()}>Cereri Active</Button></li>
        <li><Button className={this.state.showNew ? 'active' : ''} onClick={() => this.showNew()}>Cereri Noi</Button></li>
        <li><Button className={this.state.showSent ? 'active' : ''} onClick={() => this.showSent()}>Oferte Trimise</Button></li>
        <li><Button className={this.state.showHidden ? 'active' : ''} onClick={() => this.showHidden()}>Cereri Ascunse</Button></li>
      </ul>
    if (this.state.chat === true) {
      return (
        <Chat {...this.state} />
      )
    }
    else if (this.state.showActive === true) {
      return (
        <div>
          {menu}
          <div className="activeJobs-container">
            <h3>Oferte acceptate de utilizator</h3>
            <div className="jobs-container">
              {this.state.currentJobs &&
                this.state.currentJobs.map(d => (
                  <div className="job-container col-md-4 ">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
                    <Button
                      onClick={() => this.seeChat(d.id)}
                      className="btn btn-success"
                    >
                      Vezi chat
                  </Button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    } else if (this.state.showNew === true) {
      return (
        <div>

          {menu}
          <div className="newJobs-container">
            <h3>Cereri noi</h3>
            <div className="jobs-container">

              {this.state.availJobs &&
                this.state.availJobs.map(d => (
                  <div className="job-container col-md-4">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
                    <Button
                      onClick={() => this.acceptOffer(d.id, d.description)}
                      className="btn btn-success"
                    >
                      Trimite Oferta
                    </Button>
                    <Button
                      onClick={() => this.hideJob(d.id)}
                      className="btn btn-warning"
                    >
                      Ascunde
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              <div className="signup-container">
                <h1 className="page-title">Trimite Oferta </h1>
                <p>Problema : {this.state.description.value}</p>
                <div className="signup-content">
                  <Form
                    onSubmit={this.handleSubmit}
                    className="edditOffer-form"
                  >
                    <FormItem label="Durata / Ore *"
                      validateStatus={this.state.duration.validateStatus}
                      help={this.state.duration.errorMsg} hasFeedback>
                      <Input
                        size="large"
                        name="duration"
                        type="number"
                        autoComplete="off"
                        placeholder="Durata"
                        value={this.state.duration.value}
                        required
                        onChange={event =>
                          this.handleInputChange(event, this.validateDuration)
                        }
                      />
                    </FormItem>
                    <FormItem label="Cost / RON * "
                      validateStatus={this.state.cost.validateStatus}
                      help={this.state.cost.errorMsg} hasFeedback>
                      <Input
                        size="large"
                        name="cost"
                        type="number"
                        autoComplete="off"
                        placeholder="Cost"
                        value={this.state.cost.value}
                        required
                        onChange={event =>
                          this.handleInputChange(event, this.validateCost)
                        }
                      />
                    </FormItem>
                    <FormItem label="Mesaj catre client *"
                      validateStatus={this.state.description.validateStatus}
                      help={this.state.description.errorMsg} hasFeedback>
                      <Input
                        size="large"
                        name="description"
                        required
                        autoComplete="off"
                        placeholder="Raspuns"
                        onChange={event =>
                          this.handleInputChange(event, this.validateMessage)
                        }
                      />
                    </FormItem>

                    <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="signup-form-button"
                        onClick={this.handleSubmit}
                        disabled={this.isFormInvalid()}
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

      )

    } else if (this.state.showSent === true) {
      return (
        <div>
          {menu}
          <div className="currentJobs-container">
            <h3>Oferte trimise</h3>
            <div className="jobs-container">

              {this.state.offeredJobs &&
                this.state.offeredJobs.map(d => (
                  <div className="job-container col-md-4">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
                    <Button
                      onClick={() => this.deleteOffer(d.id)}
                      className="btn btn-danger"
                    >
                      Sterge Oferta
                  </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )
    } else if (this.state.showHidden === true) {
      return (
        <div>
          {menu}
          <div className="hiddenJobs-container">
            <h3>Cereri ascunse</h3>
            <div className="jobs-container">

              {this.state.hiddenJobs &&
                this.state.hiddenJobs.map(d => (
                  <div className="job-container col-md-4">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
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
          </div>
        </div>
      )
    } else {
      return (
        <div className="alljobs">
          {menu}
          <div className="currentJobs-container">
            <h3>Oferte trimise</h3>
            <div className="jobs-container">

              {this.state.offeredJobs &&
                this.state.offeredJobs.map(d => (
                  <div className="job-container col-md-4">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
                    <Button
                      onClick={() => this.deleteOffer(d.id)}
                      className="btn btn-danger">
                      Sterge Oferta
                  </Button>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div className="hiddenJobs-container">
            <h3>Cereri ascunse</h3>
            <div className="jobs-container">

              {this.state.hiddenJobs &&
                this.state.hiddenJobs.map(d => (
                  <div className="job-container col-md-4">
                    <h2> Cerere de la <span>{d.user.name}</span></h2>

                    <p>Masina <Icon type="car"></Icon>  {d.car.make} {d.car.model}</p>
                    <p>An <Icon type="calendar"></Icon>  {d.car.year}</p>
                    <p>Problema <Icon type="tool"></Icon><span key={d.id}>{d.description}</span></p>
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
        </div >
      )
    }
  }

  validateDuration = duration => {
    if (parseInt(duration) > 10000) {

      return {
        validateStatus: "error",
        errorMsg: 'Durata nu poate sa fie mai mare de 10000 de ore. '
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }

  };
  validateCost = cost => {
    if (cost < 1) {
      return {
        validateStatus: "error",
        errorMsg: 'Costul trebuie sa fie mai mare decat 0. '
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    };
  }
  validateMessage = description => {
    if (description.length < 5) {
      return {
        validateStatus: "error",
        errorMsg: 'Mesajul catre client trebuie sa depaseasca 5 caractere. '
      }
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }

  };
}

export default JobList;
