import React from "react";
import { Container } from "reactstrap";
import { AppAlert } from "../Alerts";
import Footer from "../Footer";
import Navbar from "../Navbar";

export class PrivateLayout extends React.Component {
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
