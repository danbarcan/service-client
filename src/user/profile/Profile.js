import React, { Component } from "react";
import { getUserProfile } from "../../util/APIUtils";
import { Avatar, Tabs } from "antd";
import { getAvatarColor } from "../../util/Colors";
import { formatDate } from "../../util/Helpers";
import LoadingIndicator from "../../common/LoadingIndicator";
import "./Profile.css";

export class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("Hello");
  }

  render() {
    console.log("rendered");
    console.log(this.props.currentUser);
    return (
      <div id="profile">
        <h2> Profil </h2>
        <h3> Nume utilizator : {this.props.currentUser.username}</h3>
        Parola curenta : Parola noua :
      </div>
    );
  }
}

export default Profile;
