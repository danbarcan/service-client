import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, getUnreadMessages } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";

import Login from "../user/login/Login";
import Forgot from "../user/login/Forgot";
import Home from "../user/home/Home";
import Contact from "../user/contact/Contact";
import Job from "../user/signup/Job";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import NotFound from "../common/NotFound";
import Chat from "../user/Chat";
import LoadingIndicator from "../common/LoadingIndicator";
import { Layout, notification } from "antd";
import JobList from "../poll/JobList";
import AddCar from "../util/AddCar";
import "./App.css";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: null,
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getMessages = this.getMessages.bind(this);


    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          currentUserRole: response.role,
          currentUserName: response.name,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  getMessages() {

    getUnreadMessages().then(response => {
      console.log(response);
    })
  }

  getUserProfile() {
    console.log(this.state);
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.getUserProfile();
  }

  handleLogout(
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push("/home");

    window.location.reload();

    notification[notificationType]({
      message: "Polling App",
      description: description
    });
  }

  handleLogin() {
    notification.success({
      message: "Polling App",
      description: "Te-ai logat cu succes."
    });
    this.loadCurrentUser();

    this.props.history.push("/");
  }

  componentDidMount() {
    this.getMessages();

  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    if (this.state.currentUserRole === "ROLE_USER") {
      return (
        <Layout className="app-container">
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
          />

          {/* <UnreadMessage style={this.state.showMyComponent ? {} : { display: 'none' }}> */}
          <div className=" unreadMessages">
            Ai 2 mesaje necitite. Verifica acum
            </div> />
          {/* </UnreadMessage> */}



          <Content className="app-content container">
            <div className="container">

              <div className="user-nav">
                <h3> Salut {this.state.currentUserName}</h3>
                <hr />
                <Switch>
                  <Route
                    exact
                    path="/Masini"
                    render={props => (
                      <AddCar currentUser={this.state.currentUser} />
                    )}
                  />
                  <Route
                    exact
                    path="/Profile"
                    render={props => (
                      <Profile currentUser={this.state.currentUser} />
                    )}
                  />
                  <Route
                    exact
                    path="/Chat"
                    render={props => (
                      <Chat currentUser={this.state.currentUser} />
                    )}
                  />
                </Switch>
                <Job currentUser={this.state.currentUser} />
              </div>
            </div>
          </Content>
          <AppFooter />
        </Layout >
      );
    } else if (this.state.currentUserRole === "ROLE_ADMIN") {
      return (
        <Layout className="app-container">
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
          />

          <Content className="app-content container">
            <div className="container" />
            <h3>Admin Dashboard</h3>
          </Content>
          <AppFooter currentUser={this.state.currentUser} {...this.state} />
        </Layout>
      );
    } else if (this.state.currentUserRole === "ROLE_SERVICE") {
      return (
        <Layout className="app-container">
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
          />

          <Content className="app-content container">
            <div className="container" />
            <h3>Services Dashboard</h3>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (<JobList currentUser={this.state.currentUser} />
                )}
              />
              <Route
                exact
                path="/Profile"
                render={props => (<Profile currentUser={this.state.currentUser} />
                )}
              />
            </Switch>
          </Content>
          <AppFooter />
        </Layout>
      );
    } else {
      return (
        <Layout className="app-container">
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
          />

          <Content className="app-content container">
            <Switch>
              <Route
                path="/login"
                render={props => (
                  <Login onLogin={this.handleLogin} {...props} />
                )}
              />
              <Route path="/signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/forgot-password" component={Forgot} />

              <Route
                path="/users/:username"
                render={props => (
                  <Profile
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <AppFooter />
        </Layout>
      );
    }
  }
}

export default withRouter(App);
