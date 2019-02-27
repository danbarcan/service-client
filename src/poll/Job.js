import React, { Component } from "react";
import { Avatar, Icon } from "antd";
import { Link } from "react-router-dom";
import { getAvatarColor } from "../util/Colors";
import { formatDateTime } from "../util/Helpers";

import { Radio, Button } from "antd";

class Job extends Component {
  render() {
    return (
      <div className="poll-content">
        <div className="poll-header">
          <div className="poll-question">{this.props.job.make}</div>
          <p>SS</p>
        </div>
      </div>
    );
  }
}

export default Job;
