import React, { Component } from "react";
import { updateUser } from "../../util/APIUtils";
import { Redirect } from 'react-router';
import { Form, Input, Button, Icon, notification } from "antd";

import "./Profile.css";
const FormItem = Form.Item;

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      pw: " ",
      newpw: " ",
      phone: " ",
      email: "",
      society: "",
      address: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
  }
  validate(values) {
    const errors = {};
    if (!values.name || values.title.trim() === "") {
      errors.title = "‘Enter a Title’";
    }
    if (!values.categories || values.categories.trim() === "") {
      errors.categories = "‘Enter categories’";
    }
    if (!values.content || values.content.trim() === "") {
      errors.content = "‘Enter some content’";
    }
    return errors;
  }



  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.validate(inputValue);

    this.setState({
      [inputName]: inputValue
    });
  }

  handleNewPassword(event) {
    if (event.target.value === this.state.pw) {
      notification.warning({
        message: "Polling App",
        description:
          " Parola trebuie sa fie diferita. Va rugam reincercati",
        duration: 10
      });
    } else {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;
      this.validate(inputValue);

      this.setState({
        [inputName]: inputValue
      });
    }
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
        name: this.state.name,
        username: this.props.currentUser.username,
        oldPassword: this.state.pw,
        password: this.state.newpw,
        phone: this.state.phone,
        email: this.state.email,
        serviceName: this.state.society,
        serviceAddress: this.state.address,
        redirectHome: false
      };
      updateUser(userRequest)
        .then(response => {
          notification.success({
            message: "Polling App",
            description: "Multumim ! Noile detalii au fost salvate!"
          });
          this.setState({
            redirectHome: true
          })
        })
        .catch(error => {
          notification.error({
            message: "Polling App",
            description:
              "Oups! Ceva nu a mers corect, va rugam reincercati!"
          });
        });
    }
  }

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
            <FormItem>
              <Input
                prefix={<Icon type="profile" />}
                size="large"
                name="name"
                type="text"
                placeholder="Nume de utilizator"
                onChange={event => this.handleChange(event)}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="pw"
                type="password"
                required
                placeholder="Parola curenta"
                onChange={event => this.handleChange(event)}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="newpw"
                type="password"
                placeholder="Parola noua"
                onChange={event => this.handleNewPassword(event)}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="phone" />}
                size="large"
                name="phone"
                type="number"
                placeholder="Numar de telefon"
                onChange={event => this.handleChange(event)}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="email"
                type="email"
                placeholder="Adresa de email"
                onChange={event => this.handleChange(event)}
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
        </div >
      );
    } else {
      return (
        <div id="profile">
          <h2> Editare Profil </h2>
          <h3> Nume utilizator : {this.props.currentUser.username}</h3>

          <Form onSubmit={this.handleSubmit} className="profile-form">
            <FormItem>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="pw"
                type="password"
                placeholder="Parola curenta"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" />}
                size="large"
                name="newpw"
                type="password"
                placeholder="Parola noua"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="phone" />}
                size="large"
                name="phone"
                type="number"
                placeholder="Numar de telefon"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="mail" />}
                size="large"
                name="email"
                type="email"
                placeholder="Adresa de email"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="user" />}
                size="large"
                name="society"
                type="text"
                placeholder="Nume firma"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="search" />}
                size="large"
                name="address"
                type="text"
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
}


export default Profile;
