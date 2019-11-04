import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./AppHeader.css";
import { Layout, Menu, Dropdown, Icon } from "antd";
import { getUnreadMessages } from "../util/APIUtils";
const Header = Layout.Header;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadMessage: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.getMessages = this.getMessages.bind(this)
  }


  handleMenuClick({ key }) {

    this.props.onLogout();

  }

  getMessages() {
    getUnreadMessages().then(response => {
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].value);
      }
    })
  }

  render() {
    this.getMessages();
    let menuItems;
    if (this.props.currentUser) {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" className="nav-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="Cars" className="nav-item">
          <Link to="/Masini">Masini </Link>
        </Menu.Item>,
        <Menu.Item key="Profile" className="nav-item">
          <Link to="/Profile">Profile</Link>
        </Menu.Item>,
        <Menu.Item key="logout" className="nav-item">
          <Link to="/" onClick={this.handleMenuClick} >Logout</Link>
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/home">
          <Link to="/home">Acasa</Link>
        </Menu.Item>,
        <Menu.Item key="/contact">
          <Link to="/contact">Contact</Link>
        </Menu.Item>,
        <Menu.Item key="/login">
          <Link to="/login">Logare</Link>
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Link to="/signup">Inregistrare</Link>
        </Menu.Item>
      ];
    }

    return (
      <Header className="app-header">
        <div className="layout">
          <div className="app-title">
            <div className="logo" />
            <Link to="/">Smart Service</Link>
          </div>

          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px" }}
          >
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">

    </Menu >
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={["click"]}
      getPopupContainer={() =>
        document.getElementsByClassName("profile-menu")[0]
      }
    >
      <a className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} />{" "}
        <Icon type="down" />
      </a>
    </Dropdown>
  );
}

export default withRouter(AppHeader);
