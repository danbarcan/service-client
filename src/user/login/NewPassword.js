import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import { SendNewPassword } from "../../util/APIUtils";


const FormItem = Form.Item;

class NewPassword extends Component {
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
    SendNewPassword(this.state.value);
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
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              value={this.state.value}
              size="large"
              className="login-form-button"
              onChange={this.handleChange}
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
