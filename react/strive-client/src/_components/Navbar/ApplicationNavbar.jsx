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
import { getResourcesForCurrentCulture } from "../../_helpers";

class ApplicationNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: getResourcesForCurrentCulture(),
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
      <div>
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/">Strive</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className="d-flex flex-fill justify-content-sm-end">
              <Button onClick={this.onLogoutClick}>
                {this.state.resources.inputValues.logout}
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const connectedNavbar = connect()(ApplicationNavbar);
export { connectedNavbar as ApplicationNavbar };
