import React, { Component } from "react";
import PollList from "../../poll/PollList";
import { getUserProfile } from "../../util/APIUtils";
import { Avatar, Tabs } from "antd";
import { getAvatarColor } from "../../util/Colors";
import { formatDate } from "../../util/Helpers";
import LoadingIndicator from "../../common/LoadingIndicator";
import "./Profile.css";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("Hello");
  }

  render() {
    console.log("rendered");
    return (
      <div id="profile">
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
        <h2>HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey</h2>
      </div>
    );
  }
}

export default Profile;
