import React, { Component } from "react";
import { SendEmail } from "../../util/APIUtils"
import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    SendEmail(this.state.value)

    notification.success({
      message: "Smart Service",
      description: "Multumim ! Veti primi un email cu noua parola in cel mai scurt timp"
    });
    this.props.history.push("/home");
  }

  render() {

    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h4> Nici o problema. Vom trimite o parola noua in cel mai scurt timp.
            <br></br> Va rugam completati numele de utilizator sau adresa de email.</h4>

          <FormItem label="Nume de utilizator sau email" required>
            <Input
              prefix={<Icon type="user" />}
              size="large"
              value={this.state.value}
              name="usernameOrEmail"
              placeholder="Username or Email"
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
              Trimite parola noua
          </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Forgot;
