import React, { Component } from "react";
import { Container } from "reactstrap";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default class PrivateLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}
