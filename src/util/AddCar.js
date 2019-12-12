import React, { Component } from "react";
import { addCar, getAllCars, updateCar, deleteCar } from "./APIUtils";
import { Form, Input, Button, notification, Select } from "antd";
import { Modal } from "react-bootstrap";
import "./AddCar.css";
import carLogo from '../img/car-logo.png';
import CarDetailsForm from "./CarDetailsForm";

const FormItem = Form.Item;
const { Option } = Select;

class AddCar extends Component {
  constructor(props, context) {
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
      motor: {
        value: ""
      },
      cars: [],
      isLoading: false,
      editshow: false,
      show: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getAllCars = this.getAllCars.bind(this);
    this.editCar = this.editCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }
  handleClose() {
    this.setState({ show: false, editshow: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  getAllCars() {
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

  editCar(id, make, model, year) {
    console.log(this.state);

    this.setState({
      editshow: true,
      make: {
        value: make
      },
      model: {
        value: model
      },
      year: {
        value: year
      },
      carId: { value: id }
    });
  }

  deleteCar(carId) {
    if (window.confirm("Sigur doriti sa stergeti aceasta masina ? Stergand masina se vor sterge si toate cererile.")) {
      deleteCar(carId);
      alert("Va multumim !");
      let state = this.state.cars;
      let updatedCars = [...state].filter(jobs => jobs.id !== carId);
      state = updatedCars;
      this.setState({ cars: updatedCars });
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

  callbackFunction = (childData) => {
    console.log(childData);
    this.setState({ motor: { value: childData } })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (!this.state.carId) {
      const carRequest = {
        detailsId: this.state.motor.value
      };
      addCar(carRequest)
        .then(response => {
          this.setState({
            cars: response,
            make: {
              value: ""
            },
            model: {
              value: ""
            },
            year: {
              value: ""
            },
            isLoading: false
          });
          notification.success({
            message: "Smart Service",
            description: "Multumim ! Masina a fost adaugat cu success!"
          });
        })

        .then(this.getAllCars())
        .catch(error => {
          notification.error({
            message: "Smart Service",
            description:
              error.message ||
              "Oups! Ceva nu a mers corect, va rugam reincercati!"
          });
        });
    } else {
      const carUpdateRequest = {
        userId: this.state.currentUser.id,
        id: this.state.carId.value,
        make: this.state.make.value,
        model: this.state.model.value,
        year: this.state.year.value
      };
      updateCar(carUpdateRequest)
        .then(response => {
          this.setState({
            cars: response,
            isLoading: false
          });
        })
        .then(response => {
          notification.success({
            message: "Smart Service",
            description: "Multumim ! Masina a fost adaugat cu success!"
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
  }

  isFormInvalid() {
    return !(
      this.state.make.validateStatus === "success" &&
      this.state.model.validateStatus === "success" &&
      this.state.year.validateStatus === "success"
    );
  }

  componentDidMount() {

    console.log(this.state);
    console.log(this.props);
    this.getAllCars();
  }

  render() {
    return (
      <div className="carList">
        <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
          Adaugati Masina
        </Button>
        <h3>Masinile adaugate:</h3>
        {this.state.cars.map(c => (
          <div className="car-container" key={c.id}>
            <img src={carLogo} alt="Car Logo"></img>
            <h2>
              <span>
                {c.make} {c.model}
              </span>
              <br></br>
              {c.year}</h2>
            <Button
              onClick={() => this.editCar(c.id, c.make, c.model, c.year)}
              className="btn btn-warning"
            >
              Editeaza
            </Button>
            <Button
              onClick={() => this.deleteCar(c.id)}
              className="btn btn-danger"
            >
              Sterge
            </Button>
          </div>
        ))}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="signup-container">
              <h1 className="page-title">Adaugati Masina </h1>
              <div className="signup-content">
                <Form onSubmit={this.handleSubmit} className="signup-form">
                  <CarDetailsForm parentCallback={this.callbackFunction} />
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="signup-form-button"
                      onClick={this.handleClose}
                    // disabled={this.isFormInvalid()}
                    >
                      Adauga
                    </Button>
                  </FormItem>
                </Form>

              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Edit Modal Start here ----> */}
        <Modal show={this.state.editshow} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="signup-container">
              <h1 className="page-title">Editati Masina </h1>
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

                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="signup-form-button"
                      onClick={this.handleClose}
                    // disabled={this.isFormInvalid()}
                    >
                      Salveaza modificarile
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
    if (year.length === 4) {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    } else {
      return {
        validateStatus: "error",
        errorMsg: `Anul masinii nu este corect`
      };
    }
  };
}
export default AddCar;
