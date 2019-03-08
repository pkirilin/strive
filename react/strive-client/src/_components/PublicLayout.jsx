import React from "react";
import { Container } from "reactstrap";
import { Footer } from "./Footer";

export class PublicLayout extends React.Component {
  render() {
    return (
      <Container fluid>
        {this.props.children}
        <Footer />
      </Container>
    );
  }
}
