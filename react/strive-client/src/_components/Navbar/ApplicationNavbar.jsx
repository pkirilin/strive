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
import { getResources, config } from "../../_helpers";

class ApplicationNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.resources = getResources();

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
    let { buttons } = this.resources.app.navbar;
    return (
      <div>
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/">{config.brandName}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className="d-flex flex-fill justify-content-sm-end">
              <Button onClick={this.onLogoutClick}>{buttons.logout}</Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const connectedNavbar = connect()(ApplicationNavbar);
export { connectedNavbar as ApplicationNavbar };
