import React from "react";
import { Footer } from "./Footer";
import { MainNavbar } from "./MainNavbar";

export class PrivateLayout extends React.Component {
  render() {
    return (
      <div>
        <MainNavbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
