import React, { Component } from "react";
import {
  signup,
  checkUsernameAvailability,
  checkEmailAvailability,
  addCar,
  getCurrentUser,
  getAllCars,
  updateCar,
  deleteCar
} from "./APIUtils";
import { Form, Input, Button, notification } from "antd";
import { Modal } from "react-bootstrap";
import "./AddCar.css";

const FormItem = Form.Item;

class Contact extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllCars();
  }

  render() {
    return <h2>Ceva</h2>;
  }
}
export default AddCar;
