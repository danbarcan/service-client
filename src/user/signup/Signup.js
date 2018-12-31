import React, { Component } from "react";
import {
  signup,
  checkUsernameAvailability,
  checkEmailAvailability
} from "../../util/APIUtils";
import "./Signup.css";
import { Link } from "react-router-dom";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH
} from "../../constants";

import { Form, Input, Button, notification } from "antd";
const FormItem = Form.Item;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: ""
      },
      username: {
        value: ""
      },
      email: {
        value: ""
      },
      password: {
        value: ""
      },
      phone: {
        value: ""
      },
      service_name: {
        value: ""
      },
      service_address: {
        value: ""
      },
      cui: {
        value: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(
      this
    );
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
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

    const signupRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value,
      phone: this.state.phone.value,
      service_name: this.state.service_name.value,
      service_address: this.state.service_address.value,
      cui: this.state.cui.value
    };
    signup(signupRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description:
            "Thank you! You're successfully registered. Please Login to continue!"
        });
        this.props.history.push("/login");
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
      this.state.name.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.phone.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  isFormInvalidStaff() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.phone.validateStatus === "success" &&
      this.state.password.validateStatus === "success" &&
      this.state.service_name.validateStatus === "success" &&
      this.state.service_address.validateStatus === "success" &&
      this.state.cui.validateStatus === "success"
    );
  }

  render() {
    return (
      <div className="signup-container">
        <ul class="nav nav-tabs nav-fill">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Membru
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Service
            </a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <h1 className="page-title">Inscriete ! </h1>
            <div className="signup-content">
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem
                  label="Nume"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}
                >
                  <Input
                    size="large"
                    name="name"
                    autoComplete="off"
                    placeholder="Nume si Prenume"
                    value={this.state.name.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateName)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Nume de utilizator"
                  hasFeedback
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}
                >
                  <Input
                    size="large"
                    name="username"
                    autoComplete="off"
                    placeholder="Nume de utilizator"
                    value={this.state.username.value}
                    onBlur={this.validateUsernameAvailability}
                    onChange={event =>
                      this.handleInputChange(event, this.validateUsername)
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
                    type="email"
                    autoComplete="off"
                    placeholder="Adresa de email"
                    value={this.state.email.value}
                    onBlur={this.validateEmailAvailability}
                    onChange={event =>
                      this.handleInputChange(event, this.validateEmail)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Telefon"
                  hasFeedback
                  validateStatus={this.state.phone.validateStatus}
                  help={this.state.phone.errorMsg}
                >
                  <Input
                    size="large"
                    name="phone"
                    type="number"
                    autoComplete="off"
                    placeholder="Telefon"
                    value={this.state.phone.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validatePhone)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Parola"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}
                >
                  <Input
                    size="large"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Parola trebuie sa contina intre 6 si 20 de caractere"
                    value={this.state.password.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validatePassword)
                    }
                  />
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="signup-form-button"
                    disabled={this.isFormInvalid()}
                  >
                    Inscriete
                  </Button>
                  Deja inscris ? <Link to="/login">Logheazate!</Link>
                </FormItem>
              </Form>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <h1 className="page-title">Inscriete ca Service! </h1>
            <div className="signup-content">
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem
                  label="Nume"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}
                >
                  <Input
                    size="large"
                    name="name"
                    autoComplete="off"
                    placeholder="Nume si Prenume"
                    value={this.state.name.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateName)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Nume de utilizator"
                  hasFeedback
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}
                >
                  <Input
                    size="large"
                    name="username"
                    autoComplete="off"
                    placeholder="Nume de utilizator"
                    onBlur={this.validateUsernameAvailability}
                    onChange={event =>
                      this.handleInputChange(event, this.validateUsername)
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
                    type="email"
                    autoComplete="off"
                    placeholder="Adresa de email"
                    value={this.state.email.value}
                    onBlur={this.validateEmailAvailability}
                    onChange={event =>
                      this.handleInputChange(event, this.validateEmail)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Telefon"
                  hasFeedback
                  validateStatus={this.state.phone.validateStatus}
                  help={this.state.phone.errorMsg}
                >
                  <Input
                    size="large"
                    name="phone"
                    type="number"
                    autoComplete="off"
                    placeholder="Telefon"
                    value={this.state.phone.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validatePhone)
                    }
                  />
                </FormItem>
                <FormItem
                  label="Parola"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}
                >
                  <Input
                    size="large"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Parola trebuie sa contina intre 6 si 20 de caractere"
                    value={this.state.password.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validatePassword)
                    }
                  />
                </FormItem>
                <h2> Detaliile Firmei</h2>
                <FormItem
                  label="Nume Service"
                  validateStatus={this.state.service_name.validateStatus}
                  help={this.state.service_name.errorMsg}
                >
                  <Input
                    size="large"
                    name="service_name"
                    type="text"
                    autoComplete="off"
                    placeholder="Nume Service"
                    value={this.state.service_name.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateServiceName)
                    }
                  />
                </FormItem>

                <FormItem
                  label="Adresa"
                  validateStatus={this.state.service_address.validateStatus}
                  help={this.state.service_address.errorMsg}
                >
                  <Input
                    size="large"
                    name="service_address"
                    type="text"
                    autoComplete="off"
                    placeholder="Adresa"
                    value={this.state.service_address.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateServiceAddress)
                    }
                  />
                </FormItem>

                <FormItem
                  label="CUI"
                  validateStatus={this.state.cui.validateStatus}
                  help={this.state.cui.errorMsg}
                >
                  <Input
                    size="large"
                    name="cui"
                    type="text"
                    autoComplete="off"
                    placeholder="C.U.I"
                    value={this.state.cui.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateCUI)
                    }
                  />
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="signup-form-button"
                    disabled={this.isFormInvalidStaff()}
                  >
                    Inscriete
                  </Button>
                  Deja inscris ? <Link to="/login">Logheazate!</Link>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Validation Functions

  validateName = name => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele este prea scurt (Minim ${NAME_MIN_LENGTH} caractere necesare.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Numele este prea lung (Maxim ${NAME_MAX_LENGTH} caractere.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validateServiceName = service_name => {
    if (!service_name) {
      return {
        validateStatus: "error",
        errorMsg: "Numele Serviceului este obligatoriu. "
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validateServiceAddress = service_address => {
    if (!service_address) {
      return {
        validateStatus: "error",
        errorMsg: "Adresa serviceului este obligatorie. "
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validateCUI = cui => {
    if (!cui) {
      return {
        validateStatus: "error",
        errorMsg: "Codul unic de identificare este obligatoriu. "
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validatePhone = phone => {
    if (phone.length < PHONE_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numarul de telefon este prea scurt.`
      };
    } else if (phone.length > PHONE_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Numarul de telefon este prea lung.`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validateEmail = email => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Emailul este obligatoriu"
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email nu este valid"
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Emailul este prea lung`
      };
    }

    return {
      validateStatus: null,
      errorMsg: null
    };
  };

  validateUsername = username => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele de utilizator este prea scurt. (Minim ${USERNAME_MIN_LENGTH} caractere.)`
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Numele de utilizator este prea scurt. (Maxim ${USERNAME_MAX_LENGTH} caractere.)`
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null
      };
    }
  };

  validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === "error") {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation
        }
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: "validating",
        errorMsg: null
      }
    });

    checkUsernameAvailability(usernameValue)
      .then(response => {
        if (response.available) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "success",
              errorMsg: null
            }
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: "error",
              errorMsg: "Acest nume de utilizator este deja inregistrat."
            }
          });
        }
      })
      .catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: "success",
            errorMsg: null
          }
        });
      });
  }

  validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation
        }
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "validating",
        errorMsg: null
      }
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "success",
              errorMsg: null
            }
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "error",
              errorMsg: "Adresa de email este deja inregistrata."
            }
          });
        }
      })
      .catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null
          }
        });
      });
  }

  validatePassword = password => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Parola este prea scurta. (Minimul este de  ${PASSWORD_MIN_LENGTH} caractere.)`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Parola este prea lunga. (Maximul este de ${PASSWORD_MAX_LENGTH} caractere.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };
}

export default Signup;
