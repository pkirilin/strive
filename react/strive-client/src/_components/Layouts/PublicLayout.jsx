import React from "react";
import { Container } from "reactstrap";
import { ApplicationFooter } from "../Footer";

export class PublicLayout extends React.Component {
  render() {
    return (
      <Container fluid>
        {this.props.children}
        <ApplicationFooter />
      </Container>
    );
  }
}
