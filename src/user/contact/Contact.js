import React, { Component } from "react";
import { Button, Input, Form, Select, notification } from 'antd';
import "./Contact.css";
import FormItem from "antd/lib/form/FormItem";
import PlacesAutocomplete from 'react-places-autocomplete';
import { getCategories, signup } from "../../util/APIUtils";
import { Link } from "react-router-dom";
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


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
              <Button className="hero-button">Inregistreaza-te</Button>
            </div>
          </div>
        </div>

        <div className="avantaje-container">
          <h2> Avantaje </h2>
          <ul>
            <li>Transparenta totala</li>
            <li>Zeci de cereri in fiecare zi</li>
            <li>Tu iti alegi clientii cu care lucrezi</li>
            <li>Munca de calitate este apreciata </li>
            <li><b>Gratuit</b></li>
          </ul>
        </div>
        <h2> Cum functioneaza Smart-Service.ro ? </h2>

        <div className="arrows-container">
          <div className="arrow-container">
            <h6>Gaseste</h6>
            <p>Soferi din Romania trimit cereri pentru reparatii</p>
          </div>
          <div className="arrow-container">

            <h6>Trimite pret</h6>
            <p>Garajul trimite cea mai buna oferta pentru utilizatori</p>
          </div>
          <div className="arrow-container">

            <h6>Rezerva</h6>
            <p>Odata ce utilizatorul a acceptat oferta, va intalniti pentru programare</p>
          </div>
          <div className="arrow-container">

            <h6>Review</h6>
            <p>Dupa ce service-ul termina reparatia clientul plateste si lasa un review</p>
          </div>
        </div>
        <h2>Exemple de cereri</h2>

        <div className="contact-us">
          <h2> Inroleaza-te aici</h2>
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

          </Form>
        </div>

      </div>

    )

  }

}


export default Service;
