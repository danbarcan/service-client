import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;





class Forgot extends Component {
  handleSubmit(event) {
    console.log('trimite o parola noua')
  }

  render() {

    return (
      <div class="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h4> Nici o problema. Vom trimite o parola noua in cel mai scurt timp. Va rugam completati numele de utilizator sau adresa de email.</h4>

          <FormItem label="Nume de utilizator sau email" required>

            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="usernameOrEmail"
              placeholder="Username or Email"
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
