import React, { Component } from "react";
import { Form, Input, Button, Icon, notification } from "antd";
import { SendNewPassword } from "../../util/APIUtils";


const FormItem = Form.Item;


class NewPassword extends Component {
  constructor(props) {

    super(props);
    this.state = {
      value: "",
      token: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let params = this.props.location.search;
    let token = params.split("=")[1]
    event.preventDefault()
    SendNewPassword(this.state.value, token).then(response => {
      notification.success({
        message: "Smart Service",
        description: "Multumim ! Parola a fost reinnoita"
      });
    })
      .catch(error => {
        notification.error({
          message: "Smart Service",
          description:
            "Oups! Ceva nu a mers corect, va rugam reincercati!"
        });
      })
    this.props.history.push("/home");

  }

  render() {

    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h4> Va rugam introduceti noua parola.</h4>

          <FormItem label="Noua parola" required>

            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="usernameOrEmail"
              placeholder="Noua parola"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"

            >
              Salveaza noua parola
          </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default NewPassword;
