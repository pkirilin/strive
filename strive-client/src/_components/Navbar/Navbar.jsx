import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Cookies from "js-cookie";
import { accountActions } from "../../_actions";
import { config } from "../../_helpers";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick() {
    this.props.dispatch(accountActions.logout());
  }

  render() {
    const userDetails = Cookies.getJSON(config.cookies.user.keyName);
    return (
      <BootstrapNavbar color="light" light expand="sm">
        <NavbarBrand href="/">{config.brandName}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {userDetails.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.onLogoutClick}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </BootstrapNavbar>
    );
  }
}

const connectedNavbar = connect()(Navbar);
export { connectedNavbar as Navbar };
