import React, { Component } from "react";
import serviceImage from "../../img/hero.jpg";
import "./Home.css";
import { ACCESS_TOKEN } from "../../constants";

import { Form, Input, Button, Icon, notification, Carousel } from "antd";
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
            <div class="icon-single">
              <Icon type="search" />
            </div>
            <div class="icon-text">Ne spui problema. E gratuit</div>
          </div>
          <div class="icon">
            <div class="icon-single">
              <Icon type="bars" />
            </div>
            <div class="icon-text">Alegi oferta cea mai potrivita</div>
          </div>
          <div class="icon">
            <div class="icon-single">
              <Icon type="check-circle" />
            </div>
            <div class="icon-text">Rezolvi problema. Simplu si rapid.</div>
          </div>
        </div>
        <div class="icons-text layout">
          <div class="icons-text--container layout">
            <h2>Pregatit sa incepi? </h2>
            <h2>Posteaza chiar acuma. E gratuit.</h2>
          </div>
          <div class="icons-text--button">
            <Button className="hero-button">Incepe acum</Button>
          </div>
        </div>

        <div class="services-carousel">
          <h2> Vezi cateva serviceuri de top </h2>
          <p>“At the moment I need to be able to travel frequently so a job</p>
          <p>Cate ceva despre serviceuri aici </p>
          <Carousel effect="fade" arrows="true">
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Bosch Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Casco Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Alt Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
            <div className="service-container">
              <img src={serviceImage} />
              <div className="service-body">
                <h3>Bosch Service</h3>
                <p>
                  “At the moment I need to be able to travel frequently so a job
                  with regular hours isn’t an option. Being able to earn money
                  completing tasks on-demand on Airtasker has made this
                  possible.”
                </p>
                <p>Ce spun clientii:</p>
                <p> Un Service superb </p>
              </div>
            </div>
          </Carousel>

          <Button className="hero-button btn-success">Pentru serviceuri</Button>
        </div>

        <div class="services-list">
          <ul class="garaje">
            <h2>Gaseste garajul potrivit</h2>
            <li>Garaje in Bucuresti</li>
            <li>Garaje in Bacau</li>
            <li>Garaje in Iasi</li>
            <li>Garaje in Timisoara</li>
            <li>Garaje in Cluj</li>
          </ul>
          <ul class="garaje">
            <h2>Servicii </h2>
            <li>Garaje in Bucuresti</li>
            <li>Garaje in Bacau</li>
            <li>Garaje in Iasi</li>
            <li>Garaje in Timisoara</li>
            <li>Garaje in Cluj</li>
          </ul>
        </div>
        <footer>
          <h2>Serviceul Meu</h2>
          <div className="footer-container">
            <ul>
              <li>Acasa</li>
              <li>Serviceuri</li>
              <li>Contact</li>
              <li>Logare</li>
              <li>Inregistrare</li>
            </ul>
          </div>

          <div className="footer-social">
            <h3> Contacteaza-ne pe:</h3>
            <Icon type="facebook" />
            <h3> Pentru garaje :</h3>
            <Button> Inscrie-te</Button>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
