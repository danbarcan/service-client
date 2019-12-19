import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import { getCurrentUser, getUnreadMessages, getAllMessages } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";


import Login from "../user/login/Login";
import Forgot from "../user/login/Forgot";
import NewPassword from "../user/login/NewPassword";
import Home from "../user/home/Home";
import Service from "../user/contact/Contact";
import Job from "../user/signup/Job";
import Signup from "../user/signup/Signup";
import Profile from "../user/profile/Profile";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import NotFound from "../common/NotFound";
import Admin from "../common/Admin";
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
      isLoading: false,
      showMyComponent: false
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
      let data = response;
      var total = 0;
      Object.keys(data).forEach(function (key) {
        total = total + data[key];
      })

      if (total > 1) {
        this.setState({
          showMyComponent: true
        })
        getAllMessages().then(response => {
          let Dataset = response
          Object.keys(Dataset).forEach(function (key) {
            console.log(Dataset[key][0].read);
            console.log('idul jobului ', Dataset[key][0].job.id);

            // if (Dataset[key][0].read === false) {
            //   console.log(' idul jobului este ', response.key[0].job.id)
            // }
          })
        })
      }
    })
  }


  getUserProfile() {
    console.log(this.state);
  }

  handleLogout(
    notificationType = "success",
    description = "You're successfully logged out."
  ) {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    })
    this.props.history.push("/home");
    window.location.reload();

    notification[notificationType]({
      message: "Smart Service",
      description: description
    });
  }


  handleLogin() {
    notification.success({
      message: "Smart Service",
      description: "Te-ai logat cu succes."
    });
    this.loadCurrentUser()

    this.props.history.push("/");
    this.getMessages();

  }

  componentDidMount() {
    this.loadCurrentUser();
    this.getUserProfile();
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
          {this.state.showMyComponent ? <div className="unreadMessages">
            Aveti mesaje necitite. Verifica acum !
          </div> : null}

          <Content className="app-content ">
            <div className=" transparent container">

              <div className="user-nav">
                <h3> Salut {this.state.currentUserName}</h3>
                <hr />
                <Switch>

                  <Route exact path="/"
                    render={props =>
                      (<Job currentUser={this.state.currentUser} />
                      )} />
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


          <Content className="app-content ">
            <div className="container" />
            <h3>Admin Dashboard</h3>
            <Route
              exact
              path="/Chat"
              render={props => (
                <Admin currentUser={this.state.currentUser} />
              )}
            />


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

          <Content className="app-content ">
            {this.state.showMyComponent ? <div className="unreadMessages">
              Aveti mesaje necitite. Verifica acum !
            </div> : null}
            <div className="container">
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
            </div>
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
            <Switch>
              <Route
                path="/login"
                render={props => (
                  <Login onLogin={this.handleLogin} {...props} />
                )}
              />
              <Route path="/signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/contact" component={Service} />
              <Route path="/forgot-password" component={Forgot} />
              <Route path="/new-password" component={NewPassword} />

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
            <AppFooter />
          </Content >
        </Layout>

      );
    }
  }
}

export default withRouter(App);
