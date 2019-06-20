import React, { Component } from "react";
import serviceImage from "../../img/hero.jpg";
import { createAnonJob } from "../../util/APIUtils";
import "./Home.css";
import { ACCESS_TOKEN } from "../../constants";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, Icon, notification, Carousel } from "antd";
const FormItem = Form.Item;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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
      }
    };

    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  openModal() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({ show: false });
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
      make: this.state.make.value,
      model: this.state.model.value,
      year: this.state.year.value,
      description: this.state.description.value,
      email: this.state.email.value
    };

    createAnonJob(jobRequest)
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

  isFormInvalid() {
    return !(
      this.state.make.validateStatus === "success" &&
      this.state.model.validateStatus === "success" &&
      this.state.year.validateStatus === "success" &&
      this.state.description.validateStatus === "success"
    );
  }

  render() {
    return (
      <div className="home">
        <div className="hero">
          <div className="hero-text">
            <h1 className="hero-h1">Alege serviceul potrivit</h1>
            <h2 className="hero-h2">Rapid simplu si usor</h2>

            <Button className="hero-button" onClick={() => this.openModal()}>
              Incepe acum
            </Button>
          </div>
        </div>

        <div className="icons">
          <h2>Cum functioneaza?</h2>
          <div className="icon">
            <div className="icon-single">
              <Icon type="search" />
            </div>
            <div className="icon-text">Ne spui problema. E gratuit</div>
          </div>
          <div className="icon">
            <div className="icon-single">
              <Icon type="bars" />
            </div>
            <div className="icon-text">Alegi oferta cea mai potrivita</div>
          </div>
          <div className="icon">
            <div className="icon-single">
              <Icon type="check-circle" />
            </div>
            <div className="icon-text">Rezolvi problema. Simplu si rapid.</div>
          </div>
        </div>
        <div className="icons-text layout">
          <div className="icons-text--container layout">
            <h2>Pregatit sa incepi? </h2>
            <h2>Posteaza chiar acuma. E gratuit.</h2>
          </div>
          <div className="icons-text--button">
            <Button className="hero-button">Incepe acum</Button>
          </div>
        </div>

        <div className="services-carousel">
          <h2> Vezi cateva serviceuri de top </h2>
          <p>“At the moment I need to be able to travel frequently so a job</p>
          <p>Cate ceva despre serviceuri aici </p>
          <Carousel effect="fade" arrows="true">
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Bosch Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Casco Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Alt Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Bosch Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
          </Carousel>

          <Button className="hero-button btn-success">Pentru serviceuri</Button>
        </div>

        <div className="services-list">
          <ul className="garaje">
            <h2>Gaseste garajul potrivit</h2>
            <li>Garaje in Bucuresti</li>
            <li>Garaje in Bacau</li>
            <li>Garaje in Iasi</li>
            <li>Garaje in Timisoara</li>
            <li>Garaje in Cluj</li>
          </ul>
          <ul className="garaje">
            <h2>Servicii </h2>
            <li>Garaje in Bucuresti</li>
            <li>Garaje in Bacau</li>
            <li>Garaje in Iasi</li>
            <li>Garaje in Timisoara</li>
            <li>Garaje in Cluj</li>
          </ul>
        </div>
        <footer>
          <div className="footer-container">
            <h2>Serviceul Meu</h2>

            <ul>
              <li>Acasa</li>
              <li>Serviceuri</li>
              <li>Contact</li>
              <li>Logare</li>
              <li>Inregistrare</li>
            </ul>
          </div>

          <div className="footer-social">
            <h3> Ne gasesti si aici:</h3>
            <Icon type="mail" />
            <Icon type="phone" />
            <Icon type="facebook" />
            <Icon type="Instagram" />
          </div>
          <div className="footer-signup">
            <h3> Pentru serviceuri :</h3>
            <Button className="hero-button btn-success">Inscrie-te acum</Button>
          </div>
        </footer>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="signup-container">
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
                  <FormItem
                    label="Email"
                    hasFeedback
                    validateStatus={this.state.email.validateStatus}
                    help={this.state.email.errorMsg}
                  >
                    <Input
                      size="large"
                      name="email"
                      type="text"
                      autoComplete="off"
                      placeholder="Email"
                      value={this.state.email.value}
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
          </Modal.Body>
        </Modal>
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

export default Home;
