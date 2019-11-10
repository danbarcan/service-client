import React, { Component } from "react";
import { updateUser } from "../../util/APIUtils";
import { Redirect } from 'react-router';
import { Form, Input, Button, Icon, notification } from "antd";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH
} from "../../constants";
import "./Profile.css";
const FormItem = Form.Item;

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: ""
      },
      pw: {
        value: ""
      },
      newpw: {
        value: ""
      },
      phone: {
        value: ""
      },
      email: {
        value: ""
      },
      society: {
        value: ""
      },
      address: {
        value: ""
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  handleChange(event, validationFun) {
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

  handleNewPassword(event) {
    // if (event.target.value === this.state.pw) {
    //   notification.warning({
    //     message: "Smart Service",
    //     description:
    //       " Parola trebuie sa fie diferita. Va rugam reincercati",
    //     duration: 10
    //   });
    // } else {
    //   const target = event.target;
    //   const inputName = target.name;
    //   const inputValue = target.value;
    //   this.validate(inputValue);

    //   this.setState({
    //     [inputName]: inputValue
    //   });
    // }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newpw === this.state.pw) {
      this.setState({
        incorrectPassword: true
      })
    } else {
      const userRequest = {
        id: this.props.currentUser.id,
        name: this.state.name.value,
        username: this.props.currentUser.username,
        pw: this.state.pw.value,
        newpw: this.state.newpw.value,
        phone: this.state.phone.value,
        email: this.state.email.value,
        serviceName: this.state.society.value,
        serviceAddress: this.state.address.value,
        redirectHome: false
      };
      updateUser(userRequest)
        .then(response => {
          notification.success({
            message: "Smart Service",
            description: "Multumim ! Noile detalii au fost salvate!"
          });
          this.setState({
            redirectHome: true
          })
        })
        .catch(error => {
          notification.error({
            message: "Smart Service",
            description:
              "Oups! Va rugam sa introduceti parola actuala corecta!"
          });
        });
    }
  }

  isFormInvalid() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.pw.validateStatus === "success" &&
      this.state.newpw.validateStatus === "success" &&
      this.state.phone.validateStatus === "success" &&
      this.state.email.validateStatus === "success"
    );
  }

  // isFormInvalidStaff() {
  //   return !(
  //     this.state.name.validateStatus === "success" &&
  //     this.state.username.validateStatus === "success" &&
  //     this.state.email.validateStatus === "success" &&
  //     this.state.phone.validateStatus === "success" &&
  //     this.state.password.validateStatus === "success" &&
  //     this.state.service_name.validateStatus === "success" &&
  //     this.state.service_address.validateStatus === "success" &&
  //     this.state.cui.validateStatus === "success"
  //   );
  // }

  render() {

    const redirectHome = this.state.redirectHome;
    if (redirectHome === true) {
      return <Redirect to="/" />
    }
    if (this.props.currentUser.role === "ROLE_USER") {
      return (
        <div className="profile">
          <h2> Profil </h2>
          <h3> Nume utilizator : {this.props.currentUser.username}</h3>
          <Form onSubmit={this.handleSubmit} className="profile-form">
            <FormItem
              label="Nume"
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}>
              <Input
                prefix={<Icon type="profile" />}
                size="large"
                name="name"
                type="text"
                value={this.state.name.value}
                placeholder="Nume de utilizator"
                onChange={event => this.handleChange(event, this.validateName)}
              />
            </FormItem>
            <FormItem label="Parola curenta"
              validateStatus={this.state.pw.validateStatus}
              help={this.state.pw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="pw"
                type="password"
                value={this.state.pw.value}
                required
                placeholder="Parola curenta"
                onChange={event => this.handleChange(event, this.validatePw)}
              />
            </FormItem>
            <FormItem label=" Parola noua"
              validateStatus={this.state.newpw.validateStatus}
              help={this.state.newpw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="newpw"
                type="password"
                value={this.state.newpw.value}
                placeholder="Parola noua"
                onChange={event => this.handleChange(event, this.validateNewPw)}
              />
            </FormItem>
            <FormItem label=" Numar de telefon"
              validateStatus={this.state.phone.validateStatus}
              help={this.state.phone.errorMsg}>
              <Input
                prefix={<Icon type="phone" />}
                size="large"
                name="phone"
                type="number"
                value={this.state.phone.value}
                placeholder="Numar de telefon"
                onChange={event => this.handleChange(event, this.validatePhone)}
              />
            </FormItem>
            <FormItem label="Adresa de email"
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="email"
                type="email"
                value={this.state.email.value}
                placeholder="Adresa de email"
                onChange={event => this.handleChange(event, this.validateEmail)}
              />
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="profile-form-button"
              disabled={this.isFormInvalid()}
            >
              Salvare
            </Button>
          </Form>
        </div >
      );
    } else {
      return (
        <div id="profile">
          <h2> Editare Profil </h2>
          <h3> Nume utilizator : {this.props.currentUser.username}</h3>

          <Form onSubmit={this.handleSubmit} className="profile-form">
            <FormItem
              validateStatus={this.state.pw.validateStatus}
              help={this.state.pw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="pw"
                type="password"
                value={this.state.pw.value}
                placeholder="Parola curenta"
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.newpw.validateStatus}
              help={this.state.newpw.errorMsg}>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="newpw"
                type="password"
                value={this.state.newpw.value}
                placeholder="Parola noua"
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.phone.validateStatus}
              help={this.state.phone.errorMsg}>
              <Input
                prefix={<Icon type="phone" />}
                size="large"
                name="phone"
                type="number"
                value={this.state.phone.value}
                placeholder="Numar de telefon"
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="email"
                type="email"
                value={this.state.email.value}
                placeholder="Adresa de email"
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.society.validateStatus}
              help={this.state.society.errorMsg}>
              <Input
                prefix={<Icon type="user" />}
                size="large"
                name="society"
                type="text"
                value={this.state.society.value}
                placeholder="Nume firma"
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.address.validateStatus}
              help={this.state.address.errorMsg}>
              <Input
                prefix={<Icon type="search" />}
                size="large"
                name="address"
                type="text"
                value={this.state.address.value}

                placeholder="Adresa firma"
              />
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="profile-form-button"
            >
              Salvare
            </Button>
          </Form>
        </div>
      );
    }
  }
  validateName = name => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele este prea scurt (Minim ${NAME_MIN_LENGTH} caractere necesare.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Numele este prea lung (Maxim ${NAME_MAX_LENGTH} caractere.)`
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
        validateStatus: "error",
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
      validateStatus: 'success',
      errorMsg: null
    };
  };

  validatePw = pw => {
    if (!pw) {
      return {
        validateStatus: "error",
        errorMsg: "Parola actuala este obligatorie"
      };
    }
    if (pw.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Parola este prea scurta`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }


  validateNewPw = newpw => {
    if (!newpw) {
      return {
        validateStatus: "error",
        errorMsg: "Parola noua este obligatorie"
      };
    }
    if (newpw === this.state.pw.value) {
      return {
        validateStatus: "error",
        errorMsg: "Parola noua trebuie sa fie diferita de parola actuala"
      };
    }
    if (newpw.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Parola este prea scurta`
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }
}




export default Profile;
