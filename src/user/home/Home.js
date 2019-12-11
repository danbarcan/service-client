import React, { Component } from "react";
import serviceImage from "../../img/hero.jpg";
import { createAnonJob, getAll, getAllDetailsByTypeYearId, getAllModelsByManufacturerId, getAllTypeYearsByModelId } from "../../util/APIUtils";
import "./Home.css";
import { Modal } from "react-bootstrap";
import { Form, Input, Button, Icon, notification, Carousel, Select } from "antd";

const FormItem = Form.Item;
const children = [];
const childrenModel = [];
const childrenType = [];
const childrenDetails = [];
const { Option } = Select;

getAll().then(response => {
  console.log(response)
  for (let i = 0; i < response.length; i++) {
    children.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
  }
})

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      termeniShow: false,
      confidentialityShow: false,
      make: {
        value: ""
      },
      model: {
        value: ""
      },
      year: {
        value: ""
      },
      motor: {
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
    this.openTermeni = this.openTermeni.bind(this);
    this.openConfidentiality = this.openConfidentiality.bind(this);
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

  openTermeni() {
    this.setState({
      termeniShow: true,
    })
  }

  openConfidentiality() {
    this.setState({
      confidentialityShow: true,
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  changeCar = value => {
    console.log(value)
    this.setState({
      make: {
        value: value
      }
    }, this.getModelsByMake)

  }

  getModelsByMake() {
    getAllModelsByManufacturerId(this.state.make.value).then(response => {
      for (let i = 0; i < response.length; i++) {
        childrenModel.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
      }
    })
  }

  changeModel = value => {
    console.log(value)
    this.setState({
      model: {
        value: value
      }
    }, this.getTypeByModel)
  }

  getTypeByModel() {
    getAllTypeYearsByModelId(this.state.model.value).then(response => {
      for (let i = 0; i < response.length; i++) {
        childrenType.push(<Option key={response[i].id}>{response[i].name.toString()}</Option>);
      }
    })
  }

  changeType = value => {
    console.log(value)
    this.setState({
      year: { value: value }
    }, this.getDetailsByType)
  }

  getDetailsByType() {
    getAllDetailsByTypeYearId(this.state.year.value).then(response => {
      for (let i = 0; i < response.length; i++) {
        childrenDetails.push(<Option key={response[i].id}>{response[i].type.toString()}</Option>);
      }
    })
  }

  changeDetails = value => {
    console.log(value)
    this.setState({
      motor: { value: value }
    })
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
      detailsId: this.state.motor.value,
      description: this.state.description.value,
      email: this.state.email.value
    };

    createAnonJob(jobRequest)
      .then(response => {
        notification.success({
          message: "Smart Service",
          description: "Thank you! Your job has been succesfully registered. "
        });
      })
      .then(function () {
        window.location.reload();
      })
      .catch(error => {
        notification.error({
          message: "Smart Service",
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
            <div className="hero-border">
              <h1 className="hero-h1">Alege service-ul potrivit</h1>
              <h2 className="hero-h2">Rapid simplu si usor</h2>

              <Button className="hero-button" onClick={() => this.openModal()}>
                Incepe acum
              </Button>
            </div>
          </div>
        </div>

        <div className="icons">
          <h2>Cum functioneaza?</h2>
          <div className="icon">
            <div className="icon-single">
              <Icon type="search" />
            </div>
            <div className="icon-text">Detaliaza cu ce te putem ajuta</div>
          </div>
          <div className="icon">
            <div className="icon-single">
              <Icon type="bars" />
            </div>
            <div className="icon-text">Primesti oferte de la serviceuri din apropiere</div>
          </div>
          <div className="icon">
            <div className="icon-single">
              <Icon type="check-circle" />
            </div>
            <div className="icon-text">Alegi oferta cea mai potrivita.</div>
          </div>
        </div>
        <div className="icons-text layout">
          <div className="icons-text--container layout">
            <h2>Gata sa incepi? </h2>
            <h2>Posteaza chiar acum. E gratuit.</h2>
          </div>
          <div className="icons-text--button">
            <Button className="hero-button" onClick={() => this.openModal()}>Incepe acum</Button>
          </div>
        </div>

        <div className="services-carousel">
          <h2> Vezi cateva din service-urile de top cu care lucram</h2>
          <h3>Cate ceva despre serviceuri aici </h3>
          <Carousel effect="fade" arrows="true">
            <div className="service-container">
              <img className="service-container__image" src={serviceImage} alt=" Serviceimg" />
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
              <img src={serviceImage} alt="Serviceimg" />
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
              <img src={serviceImage} alt="Serviceimg" />
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
              <img src={serviceImage} alt="Serviceimg" />
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

          <Button className="hero-button btn-success"> Devino un service partener</Button>
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
            <li>Vopsitorie</li>
            <li>Tinichigerie</li>
            <li>Vopsitorie</li>
            <li>Mecanica</li>
            <li>Geometrie Roti</li>
          </ul>
        </div>


        {/* Modal politica de confidentialitate */}

        {/* Modal inscriere service pe site */}
        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <h3> Cu ce te putem ajuta ?</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="signup-container">
              <div className="signup-content">

                <Form onSubmit={this.handleSubmit} className="signup-form">

                  <FormItem label="Marca *" >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Marca masinii"
                      optionFilterProp="children"

                      onChange={this.changeCar}
                    >
                      {children}
                    </Select>
                  </FormItem>

                  <FormItem label="Model *">
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Modelul masinii"
                      optionFilterProp="children"
                      onChange={this.changeModel}
                    >
                      {childrenModel}
                    </Select>
                  </FormItem>

                  <FormItem label="An *" >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Anul masinii"
                      optionFilterProp="children"
                      onChange={this.changeType}
                    >
                      {childrenType}
                    </Select>
                  </FormItem>

                  <FormItem label="Motorizare *" hasFeedback>
                    <Select onChange={this.changeDetails}
                      placeholder="Motorizarea"
                      optionFilterProp="children">
                      {childrenDetails}
                    </Select>
                  </FormItem>

                  <FormItem
                    label="Descriere problema cu care doriti ajutor *"
                    hasFeedback
                    validateStatus={this.state.description.validateStatus}
                    help={this.state.description.errorMsg}
                  >
                    <Input
                      size="large"
                      name="description"
                      type="text"
                      autoComplete="off"
                      placeholder="Descriere problema"
                      value={this.state.description.value}
                      onChange={event =>
                        this.handleInputChange(event, this.validateDescription)
                      }
                    />
                  </FormItem>
                  <FormItem
                    label="Email *"
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

                  <p> Campurile marcate cu * sunt obligatorii pentru a trimite o cerere.</p>

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
      </div >
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
