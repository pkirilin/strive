import React from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import { AppFooter } from "../Footer";

export class PublicLayout extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <AppAlert />
          {this.props.children}
        </Container>
        <AppFooter />
      </div>
    );
  }
}
