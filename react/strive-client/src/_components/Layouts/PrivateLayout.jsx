import React from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import { AppFooter } from "../Footer";
import { AppNavbar } from "../Navbar";

export class PrivateLayout extends React.Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <AppAlert />
          {this.props.children}
        </Container>
        <AppFooter />
      </div>
    );
  }
}
