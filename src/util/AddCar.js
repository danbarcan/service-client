import React, { Component } from "react";
import {
  signup,
  checkUsernameAvailability,
  checkEmailAvailability,
  addCar,
  getCurrentUser,
  getAllCars
} from "./APIUtils";
import { Form, Input, Button, notification } from "antd";
import { Modal } from "react-bootstrap";
import "./AddCar.css";

const FormItem = Form.Item;

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
      cars: [],
      isLoading: false,

      show: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getAllCars = this.getAllCars.bind(this);

    this.isFormInvalid = this.isFormInvalid.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
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

    const carRequest = {
      userId: this.props.currentUser.id,
      make: this.state.make.value,
      model: this.state.model.value,
      year: this.state.year.value
    };
    addCar(carRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim ! Masina a fost adaugat cu success!"
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

  isFormInvalid() {
    return !(
      this.state.make.validateStatus === "success" &&
      this.state.model.validateStatus === "success" &&
      this.state.year.validateStatus === "success"
    );
  }

  componentDidMount() {
    this.getAllCars();
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Adaugati Masina
        </Button>

        {this.state.cars.map(c => (
          <div class="job-container">
            <h2>
              <span>
                {c.make} {c.model}
              </span>
            </h2>
            <h3>{c.year}</h3>
            <Button onClick={this.editCar} className="btn btn-warning">
              Editeaza
            </Button>
            <Button onClick={this.deleteCar} className="btn btn-danger">
              Sterge
            </Button>
          </div>
        ))}
        <h3>Masinile adaugate:</h3>
        <div className="added-cars">
          <div className="col-md-4">
            <div className="car-container">
              <div className="col-md-6 edit-car">Edit</div>
              <div className="col-md-6 delete-car">Delete</div>
              <h3>Audi A3</h3>
              <h4>2009</h4>
            </div>
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="signup-container">
              <h1 className="page-title">Adaugati Masina </h1>
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
}
export default AddCar;
