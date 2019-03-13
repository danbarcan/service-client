import React, { Component } from "react";
import "./Contact.css";
import { ACCESS_TOKEN } from "../../constants";

import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

class Home extends Component {
  render() {
    return (
        <div>
            <h1 className="page-title">Contact</h1>
        </div>
    )
  }
}


export default Home;
