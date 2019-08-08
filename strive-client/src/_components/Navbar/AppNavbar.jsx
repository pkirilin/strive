import React from "react";
import { connect } from "react-redux";
import {
  Navbar,
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

class AppNavbar extends React.Component {
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
      <Navbar color="light" light expand="sm">
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
      </Navbar>
    );
  }
}

const connectedNavbar = connect()(AppNavbar);
export { connectedNavbar as AppNavbar };
