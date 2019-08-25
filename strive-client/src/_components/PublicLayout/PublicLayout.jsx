import React, { Component } from "react";
import { Container } from "reactstrap";
import Footer from "../Footer";

export default class PublicLayout extends Component {
  render() {
    return (
      <div>
        <Container>{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}
