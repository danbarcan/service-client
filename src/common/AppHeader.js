import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./AppHeader.css";
import { Layout, Menu, Dropdown, Icon, Button, Drawer } from "antd";
import logo from '../img/logo.png';

const Header = Layout.Header;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadMessage: false,
      home:''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleMenuClick({ key }) {
    this.props.onLogout();

  }

  componentDidMount(){
    if(this.props.currentUser){
      this.setState({
        home:"/"
      })
    }else{
      this.setState({
        home:"/home"
      })
    }
  }
    
  render() {
    let menuItems;
    

    if (this.props.currentUser) {
      if (this.props.currentUser.role === "ROLE_USER") {

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
            <Link to="/Profile">Profil</Link>
          </Menu.Item>,
          <Menu.Item key="logout" className="nav-item">
            <Link to="/home" onClick={this.handleMenuClick} >Logout</Link>
          </Menu.Item>
        ];
      }
      else if (this.props.currentUser.role === "ROLE_SERVICE") {
        menuItems = [
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" className="nav-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="Profile" className="nav-item">
            <Link to="/Profile">Profil</Link>
          </Menu.Item>,
          <Menu.Item key="logout" className="nav-item">
            <Link to="/home" onClick={this.handleMenuClick} >Logout</Link>
          </Menu.Item>
        ];
      }
    } else {
      menuItems = [
        <Menu.Item key="/home">
          <Link to="/home">Acasa</Link>
        </Menu.Item>,
        <Menu.Item key="/service">
          <Link to="/service">Service</Link>
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
            <Link to={this.state.home} >
              <img className="navLogo" src={logo} alt="Smart Service Logo"></img>
            </Link>
          </div>
          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px" }}
          >
            {menuItems}
          </Menu>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Drawer
            title=""
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Menu onClick={this.onClose}
            >
              {menuItems}
            </Menu>
          </Drawer>
        </div>
      </Header >
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu"></Menu >
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
