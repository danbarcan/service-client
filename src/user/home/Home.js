import React, { Component } from "react";
import "./Home.css";
import { ACCESS_TOKEN } from "../../constants";

import { Form, Input, Button, Icon, notification } from "antd";
const FormItem = Form.Item;

class Home extends Component {
  render() {
    return (
      <div class="home">
        <div class="hero">
          <div class="hero-text">
            <h1 className="hero-h1">Alege serviceul potrivit</h1>
            <h2 className="hero-h2">Rapid simplu si usor</h2>

            <Button className="hero-button">Incepe acum</Button>
          </div>
        </div>

        <div class="icons">
          <h2>Cum functioneaza?</h2>
          <div class="icon">
            <div class="icon-single" />
            <div class="icon-text">Ne spui problema. E gratuit</div>
          </div>
          <div class="icon">
            <div class="icon-single" />
            <div class="icon-text">Alegi oferta cea mai potrivita</div>
          </div>
          <div class="icon">
            <div class="icon-single" />
            <div class="icon-text">Rezolvi problema. Simplu si rapid.</div>
          </div>
        </div>

        <h2>Incepe chiar azi. E gratuit. </h2>

        <div class="services">
          <h2> Vezi cateva serviceuri de top </h2>
          <div className="carousel" />
        </div>
      </div>
    );
  }
}

export default Home;
