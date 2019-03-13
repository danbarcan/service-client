import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, createJob } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";

import Login from "../user/login/Login";
import Home from "../user/home/Home";
import Contact from "../user/contact/Contact";
import Job from "../user/signup/Job";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import PrivateRoute from "../common/PrivateRoute";

import { Layout, notification, Button } from "antd";
import JobList from "../poll/JobList";
import AddCar from "../util/AddCar";
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

  componentDidMount() {
    this.loadCurrentUser();
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

    this.props.history.push("/");
    window.location.reload();
    notification[notificationType]({
      message: "Polling App",
      description: description
    });
  }

  handleLogin() {
    notification.success({
      message: "Polling App",
      description: "You're successfully logged in."
    });
    this.loadCurrentUser();

    this.props.history.push("/");
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

          <Content className="app-content">
            <div className="container" />
            <h3>User Dashboard</h3>
            <h3> Bine ai venit, {this.state.currentUserName}</h3>
            <hr />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <hr />, <AddCar currentUser={this.state.currentUser} />
                )}
              />
              <Route
                exact
                path="/Profile"
                render={props => (
                  <hr />, <Profile currentUser={this.state.currentUser} />
                )}
              />
            </Switch>
            <Job currentUser={this.state.currentUser} />
          </Content>
          <AppFooter />
        </Layout>
      );
    } else if (this.state.currentUserRole === "ROLE_ADMIN") {
      return (
        <Layout className="app-container">
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
          />

          <Content className="app-content">
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

          <Content className="app-content">
            <div className="container" />
            <h3>Services Dashboard</h3>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <hr />, <JobList currentUser={this.state.currentUser} />
                )}
              />
              <Route
                exact
                path="/Profile"
                render={props => (
                  <hr />, <Profile currentUser={this.state.currentUser} />
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

          <Content className="app-content">
            <div className="container">
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
            </div>
          </Content>
          <AppFooter />
        </Layout>
      );
    }
  }
}

export default withRouter(App);
