import React, { Component } from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import Footer from "../Footer";

export default class PublicLayout extends Component {
  render() {
    return (
      <div>
        <Container>
          <AppAlert />
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
