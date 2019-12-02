import React, { Component } from "react";
import { Button, Input, Form } from 'antd';
import "./Contact.css";
import FormItem from "antd/lib/form/FormItem";


class Service extends Component {
  render() {
    return (
      <div>
        <div className="service-hero">
          <h2 className="page-title">Ai un service si cauti mai multi clienti ?
          <br></br>
            Alatura-te comunitatii noastre</h2>
          <Button className="btn btn-success">Inregistreaza-te</Button>
        </div>


        <div className="avantaje-container">
          <h2> Avantaje </h2>
          <ul>
            <li>Transparenta totala</li>
            <li>Zeci de cereri in fiecare zi</li>
            <li>Tu iti alegi clientii cu care lucrezi</li>
            <li>Munca de calitate este apreciata </li>
            <li><b>Gratuit</b></li>
          </ul>
        </div>

        <h2>Exemple de cereri</h2>

        <div class="contact-us">
          <h2> Inroleaza-te aici</h2>
          <Form>
            <FormItem>
              <Input>

              </Input>
            </FormItem>
          </Form>
        </div>

      </div>

    )
  }
}


export default Service;
