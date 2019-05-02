import React, { Component } from "react";
import { updateUser } from "../../util/APIUtils";

import { Form, Input, Button, Icon, notification } from "antd";

import "./Profile.css";
const FormItem = Form.Item;

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw: " ",
      newpw: "",
      phone: this.props.currentUser.phone,
      email: this.props.currentUser.email
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const pw = target.pw;
    const newpw = target.newpw;
    const phone = target.phone;
    const email = target.email;
    const society = target.society;
    const address = target.address;

    this.setState({
      pw: pw,
      newpw: newpw,
      phone: phone,
      email: email,
      society: society,
      address: address
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const userRequest = {
      userid: this.props.currentUser.id,
      oldpassword: this.state.pw,
      newpassword: this.state.newpw,
      phone: this.state.phone,
      email: this.state.email,
      society: this.state.society,
      address: this.state.address
    };
    console.log(userRequest);
    updateUser(userRequest)
      .then(response => {
        notification.success({
          message: "Polling App",
          description: "Multumim ! Detaliile au fost salvate!"
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
  render() {
    if (this.state.currentUserRole === "ROLE_USER") {
      return (
        <div className="profile">
          <h2> Profil </h2>
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
                placeholder="Parola nouta"
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
                type="number"
                placeholder="Adresa de email"
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
                placeholder="Parola nouta"
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
                type="number"
                placeholder="Adresa de email"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="user" />}
                size="large"
                name="society"
                type="number"
                placeholder="Nume firma"
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="search" />}
                size="large"
                name="address"
                type="number"
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
