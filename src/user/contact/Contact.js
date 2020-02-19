import React, { Component, createRef } from "react";
import { Button, Input, Form, Select, notification, } from 'antd';
import "./Contact.css";
import FormItem from "antd/lib/form/FormItem";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  getCategories, signup, checkUsernameAvailability,
  checkEmailAvailability, checkCUI
} from "../../util/APIUtils";
import { Link } from "react-router-dom";
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
import { CustomIcon, ContainerArrow } from '../../util/Helpers.js';

const children = [];

const childrenCategories = [];
const searchOptions = {
  componentRestrictions: { country: ['ro'] }
}
const { Option } = Select;

getCategories().then(response => {
  for (let i = 0; i < response.length; i++) {
    childrenCategories.push(<Option key={response[i].id}>{response[i].description.toString()}</Option>);
  }
})


class Service extends Component {

  constructor(props) {
    super(props);
    this.scrollDiv = createRef();


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
      service_address: '',
      cui: {
        value: "",
        errorMsg: ' Verificarea CUI-ului se face prin intermediul Termene.ro '
      },
      categories: [],
      latLng: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalidStaff = this.isFormInvalidStaff.bind(this);
    this.handleMultipleSelect = this.handleMultipleSelect.bind(this);
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

  handleMultipleSelect(value) {
    console.log(`selected ${value}`);
    this.setState({
      categories: [value]
    })
  }

  // Autocomplete Location
  handleChange = service_address => {
    this.setState({ service_address });
  };

  handleSelect = service_address => {
    geocodeByAddress(service_address).then(this.setState({ service_address: service_address }))
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ latLng: latLng }))
      .catch(error => console.error('Error', error));
  };

  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value,
      phone: this.state.phone.value,
      serviceName: this.state.service_name.value,
      cui: this.state.cui.value,
      cat: this.state.categories,
      lat: this.state.latLng.lat,
      lng: this.state.latLng.lng
    };
    signup(signupRequest)
      .then(response => {
        notification.success({
          message: "Smart Service",
          description:
            "Multumim ! V-ati inregistrat cu succes. Va rugam sa va logati !"
        });
        this.props.history.push("/login");
      })
      .catch(error => {
        notification.error({
          message: "Smart Service",
          description:
            error.message || "Ne pare rau ! Ceva este in neregula. Va rugam reincercati !"
        });
      });
  }

  isFormInvalidStaff() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.phone.validateStatus === "success" &&
      this.state.password.validateStatus === "success" &&
      this.state.service_name.validateStatus === "success" &&
      this.state.cui.validateStatus === "success"
    );
  }
  render() {

    return (
      <div>
        <div className="service-hero">
          <div className="hero-text">
            <div className="hero-border">
              <h2 className="hero-h1">Cel mai rapid mod de a obtine clienti noi.</h2>
              <Button onClick={() => {
                this.scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
              }} className="hero-button">Inregistreaza-te</Button>
            </div>
          </div>
        </div>

        <div className="avantaje-container">
          <div className="icons">
            <h2> Cum te putem ajuta ?  </h2>
            <CustomIcon title="Vizibilitate" icon="eye" description="Va ajutam sa va cresteti prezenta online." />
            <CustomIcon title="Proiecte alese" icon="bars" description="Tu alegi proiectele care ti se potrivesc la preturile care ti se potrivesc." />
            <CustomIcon title="Pe timpul tau" icon="calendar" description="Tu alegi cand cauti proiecte noi in functie de timpul potrivit." />
          </div>
        </div>
        <h2> Cum functioneaza Smart-Service.ro ? </h2>

        <div className="arrows-container">
          <ContainerArrow title="Gaseste" description="Clientii trimit cereri pentru reparatii"></ContainerArrow>
          <ContainerArrow title="Trimite pret" description="Garajul trimite cea mai buna oferta pentru utilizatori"></ContainerArrow>
          <ContainerArrow title="Rezerva" description="Odata ce utilizatorul a acceptat oferta, va intalniti pentru programare"></ContainerArrow>
          <ContainerArrow title="Review" description="Dupa ce service-ul termina reparatia clientul plateste si lasa un review"></ContainerArrow>
        </div>
        <h2>Exemple de cereri</h2>

        <div ref={this.scrollDiv} className="contact-us" >
          <h2> Inroleaza-te aici</h2>
          <Form onSubmit={this.handleSubmit} className="service-form signup-form">
            <div className="col-sm-6">
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
            </div>
            <div className="col-sm-6">
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
                    this.handleInputChange(
                      event,
                      this.validateServiceName
                    )
                  }
                />
              </FormItem>
              <FormItem label="Adresa">
                <PlacesAutocomplete
                  value={this.state.service_address}
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
              <FormItem label="Ce fel de reparatii face service-ul ?">
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
            </div>
          </Form>
        </div>

      </div >

    )

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
    if (cui.toString().length < 8 || cui.toString().length > 8) {
      return {
        validateStatus: "error",
        errorMsg: "Codul unic de identificare este invalid . Va rugam reincercati . "
      };
    } else {
      // Fetch request pentru termene care sa verifice cuiul unei firme 
      if (cui.toString().length === 8) {
        checkCUI(cui)
          .then(response => {
            if (response.cui) {
              this.setState({
                cui: {
                  value: cui,
                  validateStatus: "success",
                  errorMsg: null
                }
              });
            } else {
              this.setState({
                cui: {
                  value: cui,
                  validateStatus: "error",
                  errorMsg: "Este o problema cu Codul Unic de Inregistrare . Va rugam reincercati . "
                }
              })
            }
          })
          .catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
              cui: {
                value: cui,
                validateStatus: "error",
                errorMsg: 'Este o problema cu Codul Unic de Inregistrare . Va rugam reincercati . Alternativ, puteti sa ne contactati la contact@smart-service.ro '
              }
            });
          });
      }
    }
  }

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


export default Service;
