import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class Admin extends Component {


  render() {
    return (

      <div className="admin-dashboard">
        <div className="row">
          <div className="col-lg-12">
            <h2>Probleme recente</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h2> Utilizatori </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h2> Cereri </h2>
          </div>
        </div>
      </div>

    )
  }

}

export default withRouter(Admin);
