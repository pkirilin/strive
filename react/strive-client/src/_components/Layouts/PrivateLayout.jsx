import React from "react";
import { Container } from "reactstrap";
import { ApplicationAlert } from "../Alerts";
import { ApplicationFooter } from "../Footer";
import { ApplicationNavbar } from "../Navbar";

export class PrivateLayout extends React.Component {
  render() {
    return (
      <div>
        <ApplicationNavbar />
        <Container fluid>
          <ApplicationAlert />
          {this.props.children}
        </Container>
        <ApplicationFooter />
      </div>
    );
  }
}
