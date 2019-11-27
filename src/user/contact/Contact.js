import React, { Component } from "react";
import { Button } from 'antd';
import "./Contact.css";


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
            <li>Clienti noi</li>
            <li>Zeci de cereri in fiecare zi</li>
            <li>Reclama gratuita</li>
            <li>Munca buna este in sfarsit rasplatita prin reviewuri</li>
          </ul>
          - <em>Gratuit</em>
        </div>

        <h2>Exemple de cereri</h2>

        <h2> Inroleaza-te aici</h2>

      </div>

    )
  }
}


export default Service;
