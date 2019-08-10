import React from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import Footer from "../Footer";

export class PublicLayout extends React.Component {
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
