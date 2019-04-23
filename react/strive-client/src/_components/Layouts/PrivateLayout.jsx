import React from "react";
import { ApplicationFooter } from "../Footer";
import { ApplicationNavbar } from "../Navbar";

export class PrivateLayout extends React.Component {
  render() {
    return (
      <div>
        <ApplicationNavbar />
        {this.props.children}
        <ApplicationFooter />
      </div>
    );
  }
}
