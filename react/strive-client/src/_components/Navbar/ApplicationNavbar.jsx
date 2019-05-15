import React from "react";
import { connect } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Button
} from "reactstrap";
import { accountActions } from "../../_actions";
import { config } from "../../_helpers";

class ApplicationNavbar extends React.Component {
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
    return (
      <Navbar color="light" light expand="sm">
        <NavbarBrand href="/">{config.brandName}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <div className="d-flex flex-fill justify-content-sm-end">
            <Button color="light border" onClick={this.onLogoutClick}>
              Logout
            </Button>
          </div>
        </Collapse>
      </Navbar>
    );
  }
}

const connectedNavbar = connect()(ApplicationNavbar);
export { connectedNavbar as ApplicationNavbar };
