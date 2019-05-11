import React from "react";
import { Container } from "reactstrap";
import { ApplicationAlert } from "../Alerts";
import { ApplicationFooter } from "../Footer";

export class PublicLayout extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <ApplicationAlert />
          {this.props.children}
        </Container>
        <ApplicationFooter />
      </div>
    );
  }
}
