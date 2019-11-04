import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import notFoundImage from "../img/404.jpg";


class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <img src={notFoundImage} alt="404 Error page was not found"></img>

                <Link to="/home"><Button className="go-back-btn" type="primary" size="large">Inapoi</Button></Link>
            </div>
        );
    }
}

export default NotFound;