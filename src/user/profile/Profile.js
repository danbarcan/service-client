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

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  loadUserProfile(userId) {
    this.setState({
      isLoading: true
    });

    getUserProfile(userId)
      .then(response => {
        console.log(response);
        this.setState({
          user: response,
          isLoading: false
        });
      })
      .catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  }

  componentDidMount() {
    const userid = this.props.match.params.id;
    this.loadUserProfile(userid);
  }

  render() {
    const { currentUser } = this.props;

    console.log(this.props);
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }

    return (
      <div className="profile">
        <h1>{currentUser}</h1>
        {this.state.user ? (
          <div className="user-profile">
            <div className="user-details">
              <div className="user-avatar">
                <Avatar
                  className="user-avatar-circle"
                  style={{
                    backgroundColor: getAvatarColor(this.state.user.name)
                  }}
                >
                  {this.state.user.name[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
              </div>
            </div>
            <div className="user-poll-details" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
