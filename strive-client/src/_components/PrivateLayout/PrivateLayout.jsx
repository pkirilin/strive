import React, { Component } from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default class PrivateLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <AppAlert />
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
